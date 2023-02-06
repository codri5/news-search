// Event listener
$('#search-btn').on('click', function() {
    // Retrieve user input
    let query = $('#InputSearchTerm').val().trim();
    // URL used to query the API
    let queryURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + 
    query + '&api-key=WR5qqFxqdO9d754CMX1HbY13Em5fz58a';
    // AJAX request to API
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        // Clear articles container 
        $('.articles').empty();
        let results = response.response.docs;
        // Retrieve number of articles
        let recordNum = parseInt($('#FormControlSelect').val());
        for (let i = 0; i < recordNum; i++) {
            // Create elements
            let articleDiv = $('<div>');
            let articleNum = $('<p>');
            let headline = $('<a>');
            let author = $('<p>');
            let section = $('<p>');
            let pubDate = $('<p>');
            let articleUrl = $('<a>');
            // Add classes
            articleNum.addClass('article-number');
            articleDiv.addClass('articleDiv'); 
            articleUrl.addClass('url');
            // Add attributes to article url
            articleUrl.attr('href', results[i].web_url);
            articleUrl.attr('target', '_blank');
            // Add retrieved values to elements
            headline = headline.text(results[i].headline.main);
            author = author.text(results[i].byline.original);
            section = section.text(`Section: ${results[i].section_name}`);
            pubDate = pubDate.text((results[i].pub_date).slice(0, 10));
            articleUrl = articleUrl.text(results[i].web_url);
            // Append elements
            articleDiv.append(articleNum, headline, author, section, pubDate, articleUrl);
            $('.articles').append(articleDiv);
        }
            // Add article count
            let count = 1;
            $('.article-number').each(function() {
                $(this).text(count++);
            });
    });
});
// Event listener to clear articles
$('#clear-btn').on('click', function() {
    $('.articles').empty();
});