'use strict';

$('#search-btn').on('click', function() {

    let query = $('#InputSearchTerm').val();
    let queryURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + 
    query + '&api-key=WR5qqFxqdO9d754CMX1HbY13Em5fz58a';
    
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        $('.articles').empty();
        console.log(response)
        let results = response.response.docs;
        let recordNum = parseInt($('#FormControlSelect').val());
        for (let i = 0; i < recordNum; i++) {
            let articleNum = $('<p>');
            articleNum.addClass('article-number');
            let articleDiv = $('<div>');
            articleDiv.addClass('articleDiv');   
            let headline = $('<a>');
            let author = $('<p>');
            let section = $('<p>');
            let pubDate = $('<p>');
            let articleUrl = $('<a>')
            articleUrl.addClass('url');
            headline = headline.text(results[i].headline.main);
            author = author.text(results[i].byline.original);
            section = section.text(`Section: ${results[i].section_name}`);
            pubDate = pubDate.text((results[i].pub_date).slice(0, 10));
            articleUrl.attr('href', results[i].web_url);
            articleUrl.attr('target', '_blank');
            articleUrl = articleUrl.text(results[i].web_url);
            articleDiv.append(articleNum, headline, author, section, pubDate, articleUrl);
            $('.articles').append(articleDiv);

            let year = parseInt(results[i].pub_date.slice(0, 4));
            let startYear = parseInt($('#InputStartYear').val());
            let endYEar = parseInt($('#InputEndYear').val());
        }
        let artNum = 1;
        $('.article-number').each(function() {
            $(this).text(artNum++);
        });
    });
});

$('#clear-btn').on('click', function() {
    $('.articles').empty();
});