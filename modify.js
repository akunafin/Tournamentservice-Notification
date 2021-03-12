window.addEventListener("load", function(){
    var iframe = document.getElementById('datacell').contentWindow.document;
    var chart_section = iframe.getElementById('tab-bracket');
    var games = chart_section.querySelectorAll('table[class^="No"]');
    for (var i = 0, l = games.length; i < l; i++) {
        var game = games[i];
        var mark = game.querySelector("tbody tr td mark");
        var button = iframe.createElement("button");
        button.className = "sms";
        button.textContent = "SMS";
        mark.after(button);
        // var players = game.querySelectorAll("div[data-player]");
        // console.log(players[0].textContent + " with id = " + players[0].getAttribute('data-player') + " VS " + players[1].textContent + " with id = " + players[1].getAttribute('data-player'))
    }
});
