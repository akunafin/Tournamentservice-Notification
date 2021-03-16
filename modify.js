//SMS buttons
window.addEventListener("load", function(){
    var chart_section = document.getElementById('tab-bracket');
    if (chart_section === null) {
        return;
    }
    var games = chart_section.querySelectorAll('table[class^="No"]');
    for (var i = 0, l = games.length; i < l; i++) {
        var game = games[i];
        var running_game_time = game.querySelector("time.run");
        if (running_game_time === null)
            continue;
        var table = running_game_time.textContent.match("^.+ ([0-9]+):.+:.+$")[1];
        var mark = game.querySelector("tbody tr td mark");
        var div = document.createElement("div");
        div.className = "sms_div";
        var button = document.createElement("button");
        button.className = "sms";
        button.textContent = "SMS";
        div.appendChild(button);
        mark.after(div);

        button.addEventListener("click", function(e) {
            var button = e.srcElement || e.target;
            var game_table = button.closest("table");
            var running_game_time = game_table.querySelector("time.run");
            if (running_game_time === null)
                return;
            var table = running_game_time.textContent.match("^.+ ([0-9]+):.+:.+$")[1];
            var player_divs = game_table.querySelectorAll("div[data-player]");
            var player1_id = player_divs[0].getAttribute("data-player");
            player1_name = player_divs[0].textContent;
            var player2_id = player_divs[1].getAttribute("data-player");
            player2_name = player_divs[1].textContent;
            chrome.storage.sync.get([player1_id], function(result) {
                if (JSON.stringify(result) !== '{}') {
                    key = Object.keys(result)[0];
                    phone = result[key];
                    alert("Sending message:\n \"" + player1_name + " VS " + player2_name + "\" playing on the table " + table + "\n to the phone number: " + phone)
                }
            });
            chrome.storage.sync.get([player2_id], function(result) {
                if (JSON.stringify(result) !== '{}') {
                    key = Object.keys(result)[0];
                    phone = result[key];
                    alert("Sending message:\n \"" + player1_name + " VS " + player2_name + "\" playing on the table " + table + "\n to the phone number: " + phone)
                }
            });
        });
    }
});

//Phone fields
window.addEventListener("load", function(){
    var participants_section = document.getElementById('tab-participants');
    if (participants_section === null) {
        return;
    }
    var phone_header = document.createElement("th");
    phone_header.textContent = "Phone";
    var header = participants_section.querySelector("table thead tr");
    header.append(phone_header);

    var particpant_rows = participants_section.querySelectorAll("table tbody tr");
    for (var i = 0, l = particpant_rows.length; i < l; i++) {
        var participant_row = particpant_rows[i];
        var phone_cell = document.createElement("td");
        participant_row.appendChild(phone_cell);
        participant_id = participant_row.getAttribute("data-id");
        phone_input = document.createElement("input");
        phone_input.setAttribute("type", "text");
        phone_input.setAttribute("user_id", participant_id);
        phone_cell.appendChild(phone_input);
        phone_input.addEventListener("click", function(e){
            var el = e.srcElement || e.target;
            el.select();
        });

        chrome.storage.sync.get([participant_id], function(result) {
            if (JSON.stringify(result) !== '{}') {
                key = Object.keys(result)[0];
                document.querySelector("input[user_id=\"" + key + "\"]").value = result[key];
            }
        });

        phone_input.addEventListener("focusout", function(e) {
            var input = e.srcElement || e.target;
            var user = input.getAttribute("user_id");
            var phone = input.value;
            if (phone != "") {
                var save = {};
                save[user] = phone;
                chrome.storage.sync.set(save);
            }
            else
                chrome.storage.sync.remove(user);
        });
    }
});