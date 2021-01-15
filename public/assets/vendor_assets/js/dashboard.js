(function ($){

    /* custom legend function */
    function customLegend(chart) {
        var text = [];
        text.push('<ul class="linechart'+ chart.id + '-legend">');
        var data = chart.data;
        var datasets = data.datasets;
        var labels = data.labels;
        if (datasets.length) {
            /*check if the type of the chart is line and take length accordingly for iteration*/
            var dataLength = chart.config.type === "line" ? datasets.length : datasets[0].backgroundColor.length;

            /*set the data source according to type*/
            function getData(i){
                return (
                    [chart.config.type === "line" ? datasets[i].borderColor : datasets[0].backgroundColor[i],
                        chart.config.type === "line" ? datasets[i].label : data.labels[i]]);
            }

            /* loop through data to generate html */
            for (var i=0 ; i < dataLength; ++i) {
                text.push('<li><span style="background-color:' + (getData(i)[0]) + '"></span>');
                text.push(getData(i)[1]);
                text.push('</li>');
            }

            text.push('</ul>');
            return text.join('');
        }
    }

})(jQuery);