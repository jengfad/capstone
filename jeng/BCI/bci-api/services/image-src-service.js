module.exports = { 
    getOfficerSignature: () => {
        return "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAeAB4AAD/4RFwRXhpZgAATU0AKgAAAAgABAE7AAIAAAA3AAAISodpAAQAAAABAAAIgpydAAEAAABuAAAQ+uocAAcAAAgMAAAAPgAAAAAc6gAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEplbm5pZmVyIEZhZHJpcXVlbGEgKFRSL1QmUiBPUFMsIE1hbmlsYSAoUml6YWwgRHJpdmUpKQAAAAWQAwACAAAAFAAAENCQBAACAAAAFAAAEOSSkQACAAAAAzU1AACSkgACAAAAAzU1AADqHAAHAAAIDAAACMQAAAAAHOoAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAyMDIxOjEwOjI4IDIyOjU2OjEzADIwMjE6MTA6MjggMjI6NTY6MTMAAABKAGUAbgBuAGkAZgBlAHIAIABGAGEAZAByAGkAcQB1AGUAbABhACAAKABUAFIALwBUACYAUgAgAE8AUABTACwAIABNAGEAbgBpAGwAYQAgACgAUgBpAHoAYQBsACAARAByAGkAdgBlACkAKQAAAP/hC01odHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0n77u/JyBpZD0nVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkJz8+DQo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIj48cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPjxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSJ1dWlkOmZhZjViZGQ1LWJhM2QtMTFkYS1hZDMxLWQzM2Q3NTE4MmYxYiIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIi8+PHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9InV1aWQ6ZmFmNWJkZDUtYmEzZC0xMWRhLWFkMzEtZDMzZDc1MTgyZjFiIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPjx4bXA6Q3JlYXRlRGF0ZT4yMDIxLTEwLTI4VDIyOjU2OjEzLjU1MzwveG1wOkNyZWF0ZURhdGU+PC9yZGY6RGVzY3JpcHRpb24+PHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9InV1aWQ6ZmFmNWJkZDUtYmEzZC0xMWRhLWFkMzEtZDMzZDc1MTgyZjFiIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iPjxkYzpjcmVhdG9yPjxyZGY6U2VxIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+PHJkZjpsaT5KZW5uaWZlciBGYWRyaXF1ZWxhIChUUi9UJmFtcDtSIE9QUywgTWFuaWxhIChSaXphbCBEcml2ZSkpPC9yZGY6bGk+PC9yZGY6U2VxPg0KCQkJPC9kYzpjcmVhdG9yPjwvcmRmOkRlc2NyaXB0aW9uPjwvcmRmOlJERj48L3g6eG1wbWV0YT4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgPD94cGFja2V0IGVuZD0ndyc/Pv/bAEMABwUFBgUEBwYFBggHBwgKEQsKCQkKFQ8QDBEYFRoZGBUYFxseJyEbHSUdFxgiLiIlKCkrLCsaIC8zLyoyJyorKv/bAEMBBwgICgkKFAsLFCocGBwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKv/AABEIAF0A1gMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APpGiiigAooooAKKKKACiiigAooooAKKKKAOG+KXxQsfhholreXVm9/c3kxjgtUlEe4AZZi2DgDI7Hlh9a6rQdWj17w5pusQRtFFqFpFdIj/AHlWRAwB9+a8V+Odla+Kvi98O/C00P2hWmkmu4txXdbu8e4ZGCPlhk5Br3KxsrbTdPtrGxiWG1tYlhhiXoiKAFUfQACgCeiiigAooooAKKKKACiiigAooooAKKKKACiiigAorn/HXiyHwN4J1HxFc2z3aWSofIRgpdmdUUZ7DLDJ54ry22+PfjG8tYrqz+DuuT28yCSKWKSZkkUjIZSLfBBByCKAPcqK8S/4Xl43/wCiL+IP++p//kej/heXjf8A6Iv4g/76n/8AkegD22ivEv8AheXjf/oi/iD/AL6n/wDkej/heXjf/oi/iD/vqf8A+R6APbaK8S/4Xl43/wCiL+IP++p//kej/heXjf8A6Iv4g/76n/8AkegD22ivEv8AheXjf/oi/iD/AL6n/wDkej/hfviK151f4T+ILNOu794ePX5oVoA9torxRf2n/DduwXWPDviCxYkA5gjIB79XB4+lT/8ADUPgL/njrH/gKn/xdAFTRUGpftl+IDefvP7L0dDaZ/5ZZSAHH/f6T/vqvb6+W/C/xb8KRftHeIPF99c3FnpGp6cltDJLAxZXC24+ZU3ED903PPavofQ/G3hjxKF/sLXtPvnb/llFOvmD6p94fiKAN2iiigAooooAKKKKACiiigAooooAKKKKACiiigDzz49Ws158DvEUdtG0jrHDKVUdFSeN2P4KpP4VrfCq/t9S+Efheezk8yNNLggJHZ40Ebj8GRh+FbniHSV1/wAMapo7ymFdQs5bUyAZKCRCuce2a8a+C3jWPwcJfhj43Melanpk7rZySnbHco7lsBjxksxKn+IMMcjkA92ooooAKKKKACiiigAooooAKKKKAPBdM0bTNd/a88Z2etafa6hbHR428m6hWRc7LQZwwPPJ5rptc/Z0+H2sEvbWNzpEx532FwQM/wC6+5R+AFYvhhgv7ZXjEMQC2jRhcnqdlof6GvbqAPE/+Gd7uy/5AHxH8Q6dj7vzlsen3XTvmj/hVfxW07/kE/Faa529PtsTnP13F69sooA8SNn+0JoH7xNR0HxKq9ISqISPf5Yv/Qvxpo+N3jbQ2MXi/wCF+pIV6z2Rcxn6fKw/8er2+igDxi2/af8ABpk8rUtN1rT5R94S2yMB+T5/St6z/aC+Gt2vPiE27YztntJl/XZj9a9DubS2vI/Lu7eKdP7sqBh+RrFn8A+D7qQyXXhPQ5nPVpNNhY/mVoAw4Pjd8ObiZYo/FVoGY4BkSRF/EsoArXHxH8Dkf8jl4f8A/BpD/wDFVXvfhV4Cv4PKn8IaOi+sFmkLf99IAf1rD/4Z8+GP/Qs/+T9z/wDHKAOrs/HXhLUbuO10/wAU6LdXEhwkMGoRO7H0ADZNb1eW6h+zl8N72zaG20m40+RulxbX0rOv0EjMv5iu88L+HbXwn4ZstDsJ7me2s0KRyXUm+RgSTycD14wAAMCgB3ibw/beKvDV7ol/NcwW97H5cklrJskUZB4OD6dwQRkGm+F/Dtr4T8M2Wh2E9zPbWaFI5LqTfIwJJ5OB68YAAGBWtRQAUUUUAFcn46+Gvhv4hWIh1+z/ANIjUrDewnbND9G7j/ZOR7V1lFAHgKy/Ez4IMEnSTxp4Qj4Drnz7VP1KgD13Lx1XNem+CPip4U8fRquh6iq3m3LWFz+7nX1+X+ID1UkV2NeaePfgj4f8WudS0f8A4p/X428yLULIbNz9QXUYyc/xDDe56UAel0V4NbfFPx38MSunfFXw9PqdhG2xNcsed69iTwrH6lG9QTXqPhX4keEvGka/8I/rVtPMwybV28uYf9s2wfxGR70AdRRRRQAUUUUAFFFFAHhXx7sf+ES8S+GfiTpKvDd2t6ltetF/y1jwSA31UOhPcMB2Fe429xFdW0VxbSLLDMgeN1OQykZBB9CKyPGPhi18ZeD9R0G/wI7yEor4z5bjlHH0YA/hXmnwL8XXdmtx8NfFqNba7oWVgEjZ8+AHICnvtBGPVSCOhoA9mooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBskaSxtHKqujDDKwyCPQivM/FPwA8D+JHa4tbJ9EvSdwn01vLGex8v7v5AH3r06igDwweCfjT4KA/wCEV8XW3iSyj+7a6lxIw7D584H0kFT6Z+0DPomoJpXxW8M3nh28PH2qGJnhf/aCnJx7qXr2yqmp6Tp+tWL2WsWNvfWr/ehuYhIp/A0AUdB8YeHfFEe/w/rVlqHGSkEwLr9V+8PxFbNeUa5+zj4D1WUz6fBeaLPncHsLg7c/7r7gPwxWR/wpXx1onz+EvilqKheVt74OYwf++mH/AI7QB7dRXiBvf2gPDClrmy0XxTCn32i2q5A9APLJP/AT9KUfHHx0oAf4Ma8WHDFTPgn2/wBHNAHt1eLftB+F3ttMs/iF4fVrfXNCniZ5o+rw7sDcO+1iP+AlgeOkf/C8vG//AERfxB/31P8A/I9ZviT4t+N/EHhXVdG/4U94gt/7RsprXzsTv5fmIV3bfs4zjOcZFAHtXhfxDZ+K/C+n65prh7e9hEi4/hPRlPuGBB9xWrXA/BDSr/Rfg1oVhq9nNZXkYnMkE6FHTdPIwyp5HDA4PrXfUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB//Z"
    },

    getPhLogo: () => {
        return 'data:image/jpeg;base64,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'
    }
}