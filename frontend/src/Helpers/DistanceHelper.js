const getDistanceBetweenTwoPoints = (latitude1, longitude1, latitude2, longitude2) => {
    if ((latitude1 === latitude2) && (longitude1 === longitude2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * latitude1 / 180;
        var radlat2 = Math.PI * latitude2 / 180;
        var theta = longitude1 - longitude2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344
        return dist;
    }
}

const DistanceHelper = {
    getDistanceBetweenTwoPoints,
};

export default DistanceHelper;
