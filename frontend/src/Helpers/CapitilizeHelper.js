
const capital = (string) => {
    try {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } catch {
        // console.log("Capitalize error");
    }
};

const Capitilize = {
    capital,
};

export default Capitilize;
