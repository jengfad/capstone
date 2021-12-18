from math import log
from operator import xor
from copy import deepcopy

# The Keccak-f round constants.
RoundConstants = [
  0x0000000000000001,   0x0000000000008082,   0x800000000000808A,   0x8000000080008000,
  0x000000000000808B,   0x0000000080000001,   0x8000000080008081,   0x8000000000008009,
  0x000000000000008A,   0x0000000000000088,   0x0000000080008009,   0x000000008000000A,
  0x000000008000808B,   0x800000000000008B,   0x8000000000008089,   0x8000000000008003,
  0x8000000000008002,   0x8000000000000080,   0x000000000000800A,   0x800000008000000A,
  0x8000000080008081,   0x8000000000008080,   0x0000000080000001,   0x8000000080008008
]

RotationConstants = [
  [  0,  1, 62, 28, 27, ],
  [ 36, 44,  6, 55, 20, ],
  [  3, 10, 43, 25, 39, ],
  [ 41, 45, 15, 21,  8, ],
  [ 18,  2, 61, 56, 14, ]
]

Masks = [(1 << i) - 1 for i in range(65)]

def bits2bytes(x):
    return (int(x) + 7) / 8

def rol(value, left, bits):
    """
    Circularly rotate 'value' to the left,
    treating it as a quantity of the given size in bits.
    """
    top = value >> (bits - left)
    bot = (value & Masks[bits - left]) << left
    return bot | top

def ror(value, right, bits):
    """
    Circularly rotate 'value' to the right,
    treating it as a quantity of the given size in bits.
    """
    top = value >> right
    bot = (value & Masks[right]) << (bits - right)
    return bot | top

def multirate_padding(used_bytes, align_bytes):
    """
    The Keccak padding function.
    """
    print('multirate_padding')
    print("used_bytes {}".format(used_bytes))
    print("align_bytes {}".format(align_bytes))
    padlen = align_bytes - used_bytes
    if padlen == 0:
        padlen = align_bytes
    # note: padding done in 'internal bit ordering', wherein LSB is leftmost
    if padlen == 1:
        return [0x81]
    else:
        return [0x01] + ([0x00] * (padlen - 2)) + [0x80]

def keccak_f(state):
    print('---')
    print('keccak_f')

    """
    This is Keccak-f permutation.  It operates on and
    mutates the passed-in KeccakState.  It returns nothing.
    """
    def round(A, RC, ir):
        W, H = state.W, state.H
        rangeW, rangeH = state.rangeW, state.rangeH
        lanew = state.lanew
        zero = state.zero
    
        # theta
        C = [reduce(xor, A[x]) for x in rangeW]
        D = [0] * W
        for x in rangeW:
            D[x] = C[(x - 1) % W] ^ rol(C[(x + 1) % W], 1, lanew)
            for y in rangeH:
                A[x][y] ^= D[x]
        
        if (ir == 0):
            print('theta')
            print(A)

        # rho and pi
        B = zero()
        for x in rangeW:
            for y in rangeH:
                B[y % W][(2 * x + 3 * y) % H] = rol(A[x][y], RotationConstants[y][x], lanew)
        
        if (ir == 0):
            print('rho and phi')
            print(A)

        # chi
        for x in rangeW:
            for y in rangeH:
                A[x][y] = B[x][y] ^ ((~ B[(x + 1) % W][y]) & B[(x + 2) % W][y])
        
        if (ir == 0):
            print('chi')
            print(A)

        # iota
        A[0][0] ^= RC

        if (ir == 0):
            print('iota')
            print(A)


    l = int(log(state.lanew, 2))
    nr = 12 + 2 * l
    
    for ir in xrange(nr):
        round(state.s, RoundConstants[ir], ir)

class KeccakState(object):
    """
    A keccak state container.
    
    The state is stored as a 5x5 table of integers.
    """
    W = 5
    H = 5
    
    rangeW = range(W)
    rangeH = range(H)
    
    @staticmethod
    def zero():
        """
        Returns an zero state table.
        """
        return [[0] * KeccakState.W for x in KeccakState.rangeH]
    
    @staticmethod
    def format(st):
        """
        Formats the given state as hex, in natural byte order.
        """
        rows = []
        def fmt(x): return '%016x' % x
        for y in KeccakState.rangeH:
            row = []
            for x in rangeW:
                row.append(fmt(st[x][y]))
            rows.append(' '.join(row))
        return '\n'.join(rows)
    
    @staticmethod
    def lane2bytes(s, w):
        """
        Converts the lane s to a sequence of byte values,
        assuming a lane is w bits.
        """
        o = []
        for b in range(0, w, 8):
            o.append((s >> b) & 0xff)
        return o
    
    @staticmethod
    def bytes2lane(bb):
        """
        Converts a sequence of byte values to a lane.
        """
        r = 0
        for b in reversed(bb):
            r = r << 8 | b
        return r
    
    @staticmethod
    def bytes2str(bb):
        """
        Converts a sequence of byte values to a string.
        """
        return ''.join(map(chr, bb))
    
    @staticmethod
    def str2bytes(ss):
        """
        Converts a string to a sequence of byte values.
        """
        return map(ord, ss)

    def __init__(self, bitrate, b):
        self.bitrate = bitrate
        self.b = b

        print('self.b')
        print(self.b)
        
        # only byte-aligned
        assert self.bitrate % 8 == 0
        print('bitrate')
        print(self.bitrate)
        print('bits2bytes')
        self.bitrate_bytes = bits2bytes(self.bitrate)
        print(self.bitrate_bytes)
        
        assert self.b % 25 == 0
        self.lanew = self.b // 25
        
        self.s = KeccakState.zero()
    
    def __str__(self):
        return KeccakState.format(self.s)
    
    def absorb(self, bb):
        print("---")
        print('KeccakState.absorb')
        print('bb')
        print(bb)
        """
        Mixes in the given bitrate-length string to the state.
        """
        assert len(bb) == self.bitrate_bytes
        
        print('self.b')
        print(self.b)
        print('no of zeros')
        print(bits2bytes(self.b - self.bitrate))

        bb += [0] * bits2bytes(self.b - self.bitrate)

        print('appended bb')
        print(bb)

        i = 0

        print(bb[8:8 + 8])
        
        for y in self.rangeH:
            for x in self.rangeW:
                n = bb[i:i + 8]
                # print('n')
                # print(n)
                # print(self.s[x][y])
                # print(KeccakState.bytes2lane(n))
                # print('initial xy')
                # print(self.s[x][y])
                self.s[x][y] ^= KeccakState.bytes2lane(n)
                # print('result n')
                # print(self.s[x][y])
                i += 8

        # print('self.s')
        # print(self.s)
        # print("---")
    
    def squeeze(self):
        """
        Returns the bitrate-length prefix of the state to be output.
        """
        return self.get_bytes()[:self.bitrate_bytes]
    
    def get_bytes(self):
        """
        Convert whole state to a byte string.
        """
        out = [0] * bits2bytes(self.b)
        i = 0
        for y in self.rangeH:
            for x in self.rangeW:
                    v = KeccakState.lane2bytes(self.s[x][y], self.lanew)
                    out[i:i+8] = v
                    i += 8
        return out
    
    def set_bytes(self, bb):
        """
        Set whole state from byte string, which is assumed
        to be the correct length.
        """
        i = 0
        for y in self.rangeH:
            for x in self.rangeW:
                self.s[x][y] = KeccakState.bytes2lane(bb[i:i+8])
                i += 8

class KeccakSponge(object):
    def __init__(self, bitrate, width, padfn, permfn):
        print('---')
        print('KeccakSponge.__init')
        # print('permfn')
        # print(permfn)
        self.state = KeccakState(bitrate, width)
        self.padfn = padfn
        self.permfn = permfn
        self.buffer = []
        print('---')
        
    def copy(self):
        print('KeccakSponge.copy')
        print(self.buffer)
        return deepcopy(self)
        
    def absorb_block(self, bb):
        print('KeccakSponge.absorb_block')
        assert len(bb) == self.state.bitrate_bytes
        self.state.absorb(bb)
        self.permfn(self.state)
    
    def absorb(self, s):
        print('---')
        print('KeccakSponge.absorb')
        self.buffer += KeccakState.str2bytes(s)
        
        while len(self.buffer) >= self.state.bitrate_bytes:
            self.absorb_block(self.buffer[:self.state.bitrate_bytes])
            self.buffer = self.buffer[self.state.bitrate_bytes:]

        print('---')
    
    def absorb_final(self):
        print('KeccakSponge.absorb_final')
        padded = self.buffer + self.padfn(len(self.buffer), self.state.bitrate_bytes)
        self.absorb_block(padded)
        self.buffer = []
        
    def squeeze_once(self):
        rc = self.state.squeeze()
        self.permfn(self.state)
        return rc
    
    def squeeze(self, l):
        print('KeccakSponce.squeeze')
        Z = self.squeeze_once()
        while len(Z) < l:
            Z += self.squeeze_once()
        return Z[:l]

class KeccakHash(object):
    """
    The Keccak hash function, with a hashlib-compatible interface.
    """
    def __init__(self, bitrate_bits, capacity_bits, output_bits):
        # our in-absorption sponge. this is never given padding
        assert bitrate_bits + capacity_bits in (25, 50, 100, 200, 400, 800, 1600)
        self.sponge = KeccakSponge(bitrate_bits, bitrate_bits + capacity_bits,
                                   multirate_padding,
                                   keccak_f)
        
        # hashlib interface members
        assert output_bits % 8 == 0
        self.digest_size = bits2bytes(output_bits)
        self.block_size = bits2bytes(bitrate_bits)
    
    def __repr__(self):
        inf = (self.sponge.state.bitrate,
               self.sponge.state.b - self.sponge.state.bitrate,
               self.digest_size * 8)
        return '<KeccakHash with r=%d, c=%d, image=%d>' % inf
    
    def copy(self):
        return deepcopy(self)
    
    def update(self, s):
        print('KeccakHash.update')
        print('s')
        print(s)
        self.sponge.absorb(s)
    
    def digest(self):
        finalised = self.sponge.copy()
        finalised.absorb_final()
        digest = finalised.squeeze(self.digest_size)
        return KeccakState.bytes2str(digest)
    
    def hexdigest(self):
        return self.digest().encode('hex')
    
    @staticmethod
    def preset(bitrate_bits, capacity_bits, output_bits):
        """
        Returns a factory function for the given bitrate, sponge capacity and output length.
        The function accepts an optional initial input, ala hashlib.
        """
        def create(initial_input = None):
            h = KeccakHash(bitrate_bits, capacity_bits, output_bits)
            if initial_input is not None:
                h.update(initial_input)
            return h
        return create

# SHA3 parameter presets
Keccak224 = KeccakHash.preset(1152, 448, 224)
Keccak256 = KeccakHash.preset(1088, 512, 256)
Keccak384 = KeccakHash.preset(832, 768, 384)
Keccak512 = KeccakHash.preset(576, 1024, 512)

if __name__ == '__main__':
    import tests
    tests.run()