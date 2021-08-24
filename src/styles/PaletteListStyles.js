const styles = {
    root: {
        backgroundColor: "blue",
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center"
    },
    container: {
        width: "50%",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        alignItems: "flex-start",

    },
    nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        "& h1":{
            fontSize: "1.5rem",
            padding: "1rem 0"
        },
        "& a":{
            color: "white"
        }
        // color: "white"
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gridGap: "5%"
    }
}

export default styles;