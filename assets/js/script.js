$('#search-btn').on('click', function() {
    let query = $('#InputSearchTerm').val();
   
    queryURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + 
    query + '&api-key=WR5qqFxqdO9d754CMX1HbY13Em5fz58a'

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        console.log(response)
        let results = response.response.docs;
        let articleNum = parseInt($('#FormControlSelect').val());
        for (let i = 0; i < articleNum; i++) {
            let articleDiv = $('<div>');
            articleDiv.addClass('articleDiv');
            let headline = $('<h4>');
            let abstract = $('<p>');
            headline = headline.text(results[i].headline.main);
            abstract = abstract.text(results[i].abstract);
            articleDiv.append(headline);
            articleDiv.append(abstract);
            $('.articles').prepend(articleDiv);
        }
    })
});

$('#clear-btn').on('click', function() {
    $('.articles').empty();
});