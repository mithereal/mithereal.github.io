jQuery.githubUser = function(username, callback) {
   jQuery.getJSON('https://api.github.com/users/'+username+'/repos?callback=?',callback)
}
 
jQuery.fn.loadRepositories = function(username) {
    this.html("<span>Querying GitHub for " + username +"'s repositories...</span>");
     
    var target = this;
    var languages =new Array();
    
    $.githubUser(username, function(data) {
		
        var repos = data.data; // JSON Parsing
      
       // sortByName(repos);    
     
        var list = $('<div/>');
        target.empty().append(list);
         if(typeof repos == 'undefined')
       {
		   list.append('');
		   list.append('<div class="card">Oops there was an error Please go to the <a href="https://github.com/mithereal?tab=repositories">Repositories</a> Instead<div></div>');
	   }else{
        $(repos).each(function() {
			
            if (this.name != (username.toLowerCase()+'.github.com')) {
				list.append('');
                list.append('<div class="card"><div><a href="'+ (this.homepage?this.homepage:this.html_url) +'">' + this.name + '</a> <em>'+(this.language?('('+this.language+')'):'')+'</em></div><div>' + this.description +'</div></div>');
                 $(languages).push(this.language);
            }
           
        });      
	} // if(typeof myVar != 'undefined')
      
   
      }
      );
    
       codewall(languages);
       
    function sortByName(repos) {
        repos.sort(function(a,b) {
        return a.name - b.name;
       });
    }
    
    function codewall($data){
	
    for (var i=0;i<$data.length;i++)
    {
	var side = Math.floor(Math.random() * 2) == 0;
	if(side ==1){
    $('#section0-runner').append('<div class="codewall-l vertical">'+$data[i]+'</div>');
	}else{
	$('#section0-runner').append('<div class="codewall-r vertical">'+$data[i]+'</div>');
	}
    }
    
	}
};
