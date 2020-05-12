(function () {

  angular
    .module('ClientApp')
    .factory('lineChartService', function (){

      /*
      * Generate a lineChart
      * @param tag : string  : tag where to put the svg
      * @param data : JSON  : The data for the graph
      * @param parameters : margin : {top: 20, right: 20, bottom: 30, left: 40}
      *                     width : int : width of the graph
      *                     height : int of the graph
      *                     lineColor : array of string : set of Color to draw the line
      *                     legendSize : int : width of the graph for the legend
      *                     externalFilterSubCateg : string of the class of the filter to fetch with d3
      *                     displaySubCategoryInLegend : boolean to display or not subcategoriesfilter with d3 (set to false if subcateg > 5)
      *                     uniqueColor : boolean, if uniqueColor then no gradient color
      *                     inverseColor : boolean, if inverseColor then the gradient is in the category
      *
      */
      function draw(tag, data, parameters){
        options = {
          margin : {top: 30, right: 50, bottom: 30, left: 40},
          width : 400,
          height : 300,
          lineColor : ["#D6F107","#FFBC1C","#FD661F"],
          legendSize : 180,
          externalFilterSubCateg : null,
          displaySubCategoryInLegend : false,
          uniqueColor : false,
          inverseColor : false,
        } //default options for the graph

        options=$.extend(options,parameters); //merge the parameters to the default options
        var margin = options.margin;
            width = options.width - margin.left - margin.right - options.legendSize,
            height = options.height - margin.top - margin.bottom;
        var svg = d3.select(tag).append("svg")
            .attr("width", width + margin.left + margin.right + options.legendSize)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        var x = d3.time.scale();

        var y = d3.scale.linear();

        var xAxis = d3.svg.axis()
            .scale(x)
            //.ticks(d3.time.month,1)
            .tickSize(1)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .tickSize(1);
        var parseDate = d3.time.format("%Y-%m-%d");

        var line = d3.svg.line()
            .x(function(d) { return x(parseDate.parse(d.label)); })
            .y(function(d) { return y(d.value); });

        // Set the scales range
        var maxY = 0; // the max for Y axis
        var rangeX = []; // the date range for X axis
        var subCategories = []; //list of all subcategories
        var numberOfCategories = 0; // if there is only one category the filter can be different
        var categories = []; //list of all the categories
        var categoriesFilter = []; //list of filter for categories
        //prepare the initial data
        data.map(function(cat){
          numberOfCategories++;
          //categories.push(cat.category);
          categoriesFilter[cat.category]=[];
          categories[cat.category]= [];
          cat.series.forEach(function(subcat){
            categories[cat.category].push(subcat.category);
            if(subCategories.indexOf(subcat.category)===-1)
              subCategories.push(subcat.category);
            subcat.series.forEach(function(d){
              if(maxY<d.value)
                maxY = d.value;
              if(rangeX.indexOf(d.label)===-1)
                rangeX.push(d.label);
            });
          categoriesFilter[cat.category]=categories[cat.category].slice();
          });
        });
        //convert the text to date
        rangeX = rangeX.map(function(elt){
          return parseDate.parse(elt);
        })
        // if we don't have enough color we add some
        if(!options.uniqueColor){
          if(subCategories.length > options.lineColor.length && numberOfCategories==1)
            for(i=options.lineColor.length; i <= subCategories.length; i++)
            {
              options.lineColor.push('#'+(Math.random()*0xFFFFFF<<0).toString(16));
            }
          if(numberOfCategories !=1 && Object.keys(categories).length > options.lineColor.length && !options.inverseColor){
            for(i=options.lineColor.length; i <= Object.keys(categories).length; i++)
            {
              options.lineColor.push('#'+(Math.random()*0xFFFFFF<<0).toString(16));
            }
          }
          if(numberOfCategories !=1 && subCategories.length > options.lineColor.length && options.inverseColor){
            for(i=options.lineColor.length; i <= subCategories.length; i++)
            {
              options.lineColor.push('#'+(Math.random()*0xFFFFFF<<0).toString(16));
            }
          }
        }else{
          let numberOfColorNeeded = subCategories.length * numberOfCategories;
          if(numberOfColorNeeded > options.lineColor.length){
            for(i=options.lineColor.length; i <= numberOfColorNeeded; i++)
            {
              options.lineColor.push('#'+(Math.random()*0xFFFFFF<<0).toString(16));
            }
          }
        }

        y.domain([0,maxY])
        .range([height, 0]);
      rangeX.sort(function(a,b){ //sort the array of date
        return a- b;
      });

        x.domain([rangeX[0],rangeX[rangeX.length-1]])
        .range([0, width]);

        //manage the ledend and the layout
        var legend = svg.append("g")
             .attr("class", "legend")
             .attr("x",width + margin.left)
             .attr("y", margin.top)
             .attr("height", height)
             .attr("width", options.legendSize);

            var subIndex = 0;
            legend.selectAll('g').data(Object.keys(categories))
               .enter()
               .append('g')
               .each(function(d, i) {
                  var g = d3.select(this);
                  g.append("rect")
                     .attr("x", width + margin.left + 10)
                     .attr("y", (i+subIndex)*25)
                     .attr("width", 18)
                     .attr("height", 18)
                     .on('click', function(){
                       legendOnClick(Object.keys(categories)[i],null);
                     })
                     .style("fill", function(){
                       if(options.uniqueColor)
                        return "white";
                      return options.lineColor[i];
                     });

                  g.append("text")
                     .attr("x", width + margin.left + 30)
                     .attr("y", (i+subIndex) * 25 + 15)
                     .attr("height",30)
                     .attr("width",100)
                     .style("fill", 'black')
                     .text(Object.keys(categories)[i]);
                  if(options.displaySubCategoryInLegend)
                    categories[Object.keys(categories)[i]].forEach(function(sc,j) {
                      subIndex++;
                      indexColor = i;
                      opacityIndex = 1;
                      if(numberOfCategories==1){//if there is only one category, dispatch the predefine color for subCat
                        indexColor = j;
                      }else if(options.uniqueColor && numberOfCategories >1){
                        indexColor = (i*categories[Object.keys(categories)[i]].length)+j+1;
                      }
                      else{ //make a gradiant in the color
                        opacityIndex = (j+1)/categories[Object.keys(categories)[i]].length;
                      }
                      g.append("rect")
                         .attr("x", width + margin.left + 30)
                         .attr("y", (i+subIndex)*25)
                         .attr("width", 18)
                         .attr("height", 18)
                         .on('click', function(){
                           legendOnClick(Object.keys(categories)[i],sc);
                         })
                         .style("opacity", opacityIndex)
                         .style("fill", options.lineColor[indexColor]);

                      g.append("text")
                         .attr("x",  width + margin.left + 50)
                         .attr("y", (i+subIndex) * 25 + 15)
                         .attr("height",30)
                         .attr("width",100)
                         .style("fill", 'black')
                         .text(sc);
                    });
                });

      function legendOnClick(categClick,subCategClick, checkedInput = null) {
        if(subCategClick == null)//we want to hide/show categ totally
        {
            if(categoriesFilter[categClick].length>0){
              categoriesFilter[categClick] = [];
            }
            else{
              categoriesFilter[categClick]=categories[categClick].slice();
            }
        }else if(categClick == null){ //we want to hide/show a subcateg
          for (var cle in categoriesFilter) {
              if (categoriesFilter.hasOwnProperty(cle)) {
                presentSubCateg = categoriesFilter[cle].indexOf(subCategClick);
                if(presentSubCateg>-1 && checkedInput === false){
                  categoriesFilter[cle].splice(presentSubCateg,1);
                }else if(presentSubCateg==-1 && checkedInput === true){
                  categoriesFilter[cle].push(subCategClick);
                }
              }
          }
        }
        else { //we just want to hide/show a specific subcateg for one categ
            presentSubCateg = categoriesFilter[categClick].indexOf(subCategClick);
            if(presentSubCateg>-1){
              categoriesFilter[categClick].splice(presentSubCateg,1);
            }else{
              categoriesFilter[categClick].push(subCategClick);
            }
            if(options.externalFilterSubCateg && options.displaySubCategoryInLegend){ //we need to untick if we disable the line
              exist = false;
              for (var cle in categoriesFilter) {
                  if (categoriesFilter.hasOwnProperty(cle)) {
                    if(categoriesFilter[cle].includes(subCategClick)===true){
                        exist = true;
                        break;
                      }
                  }
              }
              var extFil = d3.selectAll(options.externalFilterSubCateg)
                .each(function(d,i){
                  d3.select(this)
                  if(this.value === subCategClick && !exist)
                    this.checked = false;
                  if(this.value === subCategClick && exist)
                    this.checked = true;
                });
            }
        }
        drawLine(categoriesFilter);
        //we need to manage the tick of external filter
        if(subCategClick == null && options.externalFilterSubCateg && numbersLine==0) //we have no line drawn
          var extFil = d3.selectAll(options.externalFilterSubCateg)
            .each(function(d,i){
              d3.select(this);
              this.checked = false;
            });
        if(subCategClick == null && options.externalFilterSubCateg && numbersLine>0) //we have one line drawn
          var extFil = d3.selectAll(options.externalFilterSubCateg)
            .each(function(d,i){
              d3.select(this);
              this.checked = true;
            });
      }

        var numbersLine = 0;
        function drawLine(inputFilter){
          numbersLine = 0;
          d3.select(tag).selectAll('.line').remove();
          data.map(function(cat,catIndex){
              if(Object.keys(inputFilter).indexOf(cat.category ) > -1){
                cat.series.forEach(function(subcat, index){
                  if(inputFilter[cat.category].indexOf(subcat.category ) > -1){
                    numbersLine++;
                    opacityIndex = 1;
                    svg.append("path")
                    //.append("path_"+cat.category.replace(/ /g,"")+'_'+subcat.category.replace(/ /g,""))
                        .attr("class", "line")
                        .style("fill","none")
                        .attr("stroke", function(){
                          let indexColor = catIndex;
                          if(numberOfCategories==1){//if there is only one category, dispatch the predefine color for subCat
                            indexColor = index;
                          }else if(options.uniqueColor && numberOfCategories >1){
                            indexColor = (catIndex*categories[cat.category].length)+index+1;
                          }
                          else{ //make a gradiant in the color
                            opacityIndex = (index+1)/categories[Object.keys(categories)[catIndex]].length;
                          }
                          return options.lineColor[indexColor];
                        })
                        .attr("stroke-width", 2)
                        .style("opacity", opacityIndex)
                        .attr("d", line(subcat.series));
                      }
                });
              }
          });
        }

        if(options.externalFilterSubCateg){ // check if we have set an external filter
          var filterSubCategories = d3.selectAll(options.externalFilterSubCateg);
          filterSubCategories.on('change', function() {
            legendOnClick(null,this.value,this.checked);
          });
        }

        //draw other stuff
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .attr("opacity", 0.7)
            .attr("stroke", "lightgrey")
            .style('fill', 'black')
            .style('stroke', '#000')
            .style('shape-rendering', 'crispEdges')
            .style('stroke-width', 0.4)
            .call(xAxis
              //.tickFormat(d3.time.format("%B %y"))
            );
            //.select(".domain").remove();

        svg.append("g")
            .attr("class", "y axis")
            .attr("opacity", 0.7)
            .attr("stroke", "lightgrey")
            .style('fill', 'black')
            .style('stroke', '#000')
            .style('shape-rendering', 'crispEdges')
            .style('stroke-width', 0.4)
            .call(yAxis);

        drawLine(categories);

      }

      return {
          draw: draw
      }
    });

})
();
