function addBarChartToPage(elementID){
    //PRE: Pass the string of the ID of the element we want to add the chart to
    //POST: Appends a bar chart (one bar per photo) built from data.csv to that element

    // Adapted from: https://d3-graph-gallery.com/graph/barplot_basic.html
    // set the dimensions and margins of the graph
    const margin = {top: 30, right: 30, bottom: 70, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the element
    const svg = d3.select("#" + elementID)
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Parse the Data
    d3.csv("data.csv").then( function(data) {
        // X axis (one slot per photo)
        const x = d3.scaleBand()
            .range([ 0, width ])
            .domain(data.map(d => d.Photo))
            .padding(0.2);
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");

        // Y axis (change the 10 to be at least your largest vote count)
        const y = d3.scaleLinear()
            .domain([0, 10])
            .range([ height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // X axis label
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("x", width/2)
            .attr("y", height + margin.top + 20)
            .text("Photo");

        // Y axis label
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left+20)
            .attr("x", -height/2)
            .text("Votes for favorite photo");

        // Bars
        svg.selectAll("mybar")
            .data(data)
            .join("rect")
                .attr("x", d => x(d.Photo))
                .attr("y", d => y(+d.Votes))
                .attr("width", x.bandwidth())
                .attr("height", d => height - y(+d.Votes))
                .attr("fill", "steelblue");
    })
}