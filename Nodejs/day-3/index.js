const EventEmitter = require("events");
const fs = require("fs");
const emitter = new EventEmitter();

const data = {
    eventCounts:{
        login:0,
        logout:0,
        purchase:0,
        profileUpdate:0
    },
    summary:[]
}

const logFile = "Nodejs/day-3/pk-eventLogs.json";

if (fs.existsSync(logFile)) {
    const fileData = fs.readFileSync(logFile, "utf-8");
    Object.assign(data, JSON.parse(fileData));
}

function saveCounts() {
    fs.writeFileSync(logFile, JSON.stringify(data, null, 2));
}

emitter.on("login", (username) => {
    data.eventCounts.login++;
    console.log(`${username} logged in successfully✅`);
    saveCounts();
});

emitter.on("logout", (username) => {
    data.eventCounts.logout++;
    console.log(`${username} logged out successfully✅`);
    saveCounts();
});

emitter.on("purchase", (item) => {
    data.eventCounts.purchase++;
    console.log(`${item} purchased successfully✅`);
    saveCounts();
});

emitter.on("profileUpdate", (username) => {
    data.eventCounts.profileUpdate++;
    console.log(`${username}'s profile updated successfully✅`);
    saveCounts();
});

// Addin summary of counts in pk-event.json file
emitter.on("summary", () => {
    const summaryText = {
        timestamp: new Date().toISOString(),
        summary: {...data.eventCounts}
    };

    console.log("📊 Event Summary:");
    for (let [event, count] of Object.entries(data.eventCounts)) {
        console.log(`${event.toUpperCase()}: ${count}`);
    }

    data.summary.push(summaryText)
    saveCounts()

});

// Emit multiple times
emitter.emit("login", "Prem Karn");
emitter.emit("login", "Priya Karn");

emitter.emit("purchase", "Mobile");
emitter.emit("purchase", "Laptop");

emitter.emit("profileUpdate", "Prem Karn");
emitter.emit("profileUpdate", "Priya Karn");

emitter.emit("logout", "Prem Karn");
emitter.emit("logout", "Priya Karn");

// Show summary
emitter.emit("summary");
