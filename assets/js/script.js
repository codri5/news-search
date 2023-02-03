let query = $('#InputSearchTerm').val();

$('#search-btn').on('click', function() {

   
    queryURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + 
    query + '&api-key=WR5qqFxqdO9d754CMX1HbY13Em5fz58a'

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        let results = response.response.docs;
        let articleNum = parseInt($('#FormControlSelect').val());
        for (let i = 0; i < articleNum; i++) {
            let articleDiv = $('<div>');
            let headline = $('<a>');
            let abstract = $('<p>');
            articleDiv.addClass('articleDiv');    
            headline = headline.text(results[i].headline.main);
            abstract = abstract.text(results[i].abstract);
            let articleUrl = results[i].web_url;
            headline.attr('href', articleUrl);
            headline.attr('target', '_blank');
            articleDiv.append(headline);
            articleDiv.append(abstract);
            $('.articles').prepend(articleDiv);
            if (query != '') {
                console.log('hello');
            }
      
        }
    })
});

$('#clear-btn').on('click', function() {
    $('.articles').empty();
});