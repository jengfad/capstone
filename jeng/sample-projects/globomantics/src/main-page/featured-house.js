import House from "../house";

const FeaturedHouse = ({ house }) => {
    if (!house)
        return <div>No featured house at this time</div>;
    
    return (
        <div>
            <div className="row featured-house">
                <h3 className="col-md-12 text-center">Featured house</h3>
            </div>
            <House house={house}/>
        </div>
    );
}
 
export default FeaturedHouse;