//API being used: https://www.api-basketball.com/

document.addEventListener("DOMContentLoaded", () => {
    fetchLiveGame();
    fetchMVPStats();
    fetchAIPrediction();
    fetchNews();
});

async function fetchLiveGame(){
    let reponse, responseJSON; 
        
        //Call to API 
        try {

            fetch("https://v1.basketball.api-sports.io/odds?season=2024-2025&bet=1&bookmaker=6&game=1912&league=12", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "v1.basketball.api-sports.io",
                    "x-rapidapi-key": "XxXxXxXxXxXxXxXxXxXxXxXx"
                }
            })
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            });
            
        } catch (e) {
            console.error("fetching data failed:", e);
            alert(e); 
            return; 
        }
 
        let odds = responseJSON.get("odds"); 

        document.getElementById("ai-prediction").innerHTML = "Odds" + odds;

        /* // Given by the API - wanted to do it similar to the Web 103 projects
        fetch("https://v1.basketball.api-sports.io/games?date=2019-11-23", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v1.basketball.api-sports.io",
                "x-rapidapi-key": "XxXxXxXxXxXxXxXxXxXxXxXx"
            }
        })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        });
        */
}







/*
function fetchLiveGame() {
    // Replace with an actual API call
    document.getElementById("live-game").innerHTML = `
        <p><strong>Cavs</strong> vs <strong>Bulls</strong></p>
        <p>Score: 13 - 12</p>
        <p>Time Remaining: 5:28 1Q</p>
        <p>Player of the Game: N/A</p>
    `;
}
*/ 

function fetchMVPStats() {
    // Replace with an actual API call
    let mvpPlayers = [
        { name: "Shai", team: "Thunder", ppg: 32.6, rpg: 5.0, apg: 6.4 },
        { name: "Jokic", team: "Nuggets", ppg: 30.0, rpg: 12.8, apg: 10.2 },
        { name: "Giannis", team: "Bucks", ppg: 30.5, rpg: 11.9, apg: 6.3 }
    ];

    let list = document.getElementById("mvp-list");
    list.innerHTML = "";
    mvpPlayers.forEach(player => {
        let li = document.createElement("li");
        li.textContent = `${player.name} (${player.team}) - ${player.ppg} PPG, ${player.rpg} RPG, ${player.apg} APG`;
        list.appendChild(li);
    });
}

function fetchAIPrediction() {
    // Replace with AI analysis
    document.getElementById("ai-prediction").textContent = 
        "based on team stats.......";
}

function fetchNews() {
    // Replace with an API call
    document.getElementById("news-feed").innerHTML = `
        <p><strong>Breaking:</strong> Nuggets Fire Head Coach Michael Malone and GM Calvin Booth. <a href="https://www.nytimes.com/athletic/6264653/2025/04/08/michael-malone-fired-nuggets-head-coach/">Read more</a></p>
        <p><strong>Trade Rumors:</strong> Phoenix Suns are looking to acquire a large haul for Kevin Durant even though he doesn't want to leave. <a href="https://www.espn.com/nba/story/_/id/44540677/stake-nba-west-storylines-matchups-playoffs">Read more</a></p>
    `;
}
