jQuery.githubUser = function(username, callback) {

        jQuery.getJSON('https://api.github.com/users/' + username + '/repos?callback=?', callback);

};
 
jQuery.fn.loadRepositories = function(username) {
    this.html("<span>Querying GitHub for " + username +"'s repositories...</span>");
     
    var target = this;
    var repositories = new Array();

    // if(Array.isArray(username)){
    //     username.each(function(u) {
    //         wall = fetchuser(u);
    //     });
    //
    // }else{
    //     wall = fetchuser(username);
    //
    // }

    $.githubUser(username, function(data) {

        var repos = data.data; // JSON Parsing

         var sorted_repos = sortByDate(repos);
        sorted_repos = sorted_repos.reverse();
        //var sorted_repos = repos;

        var list = $('<div/>');

        target.empty().append(list);

        if(repos.message == "API rate limit exceeded for 68.231.163.171. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)")
        {
            list.append('');
            list.append('<div class="card">Oops there was an error Please go to the <a href="https://github.com/mithereal?tab=repositories">Repositories</a> Instead<div></div>');
        }else{
            $(sorted_repos).each(function() {

                if (this.name != (username.toLowerCase()+'.github.com')) {
                    list.append('');
                    list.append('<div class="card"><div><a href="'+ (this.homepage?this.homepage:this.html_url) +'">' + this.name + '</a> <em>'+(this.language?('('+this.language+')'):'')+'</em></div><div>' + this.description +'</div></div>');
                    repositories.push(this.language);
                }
            });

            return repositories;
        }
    });

    show_wall(repositories);

    function unique(arr){
       var uniques = [];
       $.each(arr, function(i, el){
       if($.inArray(el, uniques) === -1) uniques.push(el);
       });
       return uniques;
       }


    
    function show_wall(x){

	var lastwidth=0;
	var maxwidth=100;

    for (var i=0;i<x.length;i++)
    {
		if(x[i] === null)
		{
            x[i] = "Bash";
		}

	var width = Math.floor(Math.random() * maxwidth);

	if(width+10 >= lastwidth)
	{
		var diff=width - lastwidth;
		width = width + diff;
		if(width + diff >= maxwidth || width + diff >= maxwidth){
			if(diff < 10)
			{
				width=lastwidth -10
				
			}else{
			width=width - diff;
			}
		}
	}else{
		var diff=width - lastwidth;
		if( diff < 10){
			var rand=Math.floor(Math.random() * 7);
			width =width-rand;
			width =width-diff;
			
		}else{
		width = width - diff; 
		}
	}
console.log(arr[i]);
	$('#section0-runner').append('<div style="width:'+width+'px" class="show_wall vertical">'+x[i]+'</div>');

	lastwidth=width;
    }
    
	}

};

function sortByDate(array = []) {
    var sorted = array.sort(function(a,b) {
        return a.updated_at > b.updated_at;
    });

    return sorted;
}