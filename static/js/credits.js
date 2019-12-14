let page = 1;

// hide credits or some shit lol
function loadCredits() {
	$('.subCredits').hide()
	$('#gdb_credits-' + page).show()
	$('#gdb_credits').show()
}

// load function
fetch("/api/credits").then(res => res.json()).then((res) => {
    // someone modified it :thinking:
    if (res.code == 500) {
        return reroute(url);
    }

    // credits
    res.credits.forEach((x, y) => {
        $("#gdb_credits").append(creditsModal(y, x, res.credits.length));
    })

    // appendclose
    $("#gdb_credits").append(closeModal)
})

// MODALS
function creditsModal(id, x, len) {
    //<!-- style="display: none;--> 
return `<div id="gdb_credits-${id+1}" class="subCredits" style="display: none; z-index: 5;">
    <div class="brownBox supercenter" style="width: 80vh; height: 43%; padding-top: 1.5%; padding-bottom: 3.5%;">
        <h1>${x.header}</h1><br>
        <h2 style="margin-bottom: 1.5%" class="gdButton"><a href="#">${x.name}</h2></a>
        <img src="https://gdbrowser.com/icon/${x.ign || x.name}" height=30%; style="margin-bottom: 7%"><br>
        ${iconModal(x.icons || []).join("")}
    <div>

    ${buttonModals(id, len) || ""}
</div>`;
};

function iconModal(x) {
    let list = [];
    x.forEach((icon, y) => {
       list.push(`<a target=_blank href="${icon.url}"><img src="/assets/images/${icon.source}.png" width="11%" class="${(y > 0) ?  "sideSpace " : ""}gdButton"></a>`);
    })

    return list;
}

function buttonModals(y, len) {
    if (len == 1) return null;
    if (y == len - 1) {
        return `<img class="gdButton" src="/assets/images/buttons/arrow-left.png" width="60vh" style="${y == 0 ? "display: none; " : ""}position: absolute; top: 45%; right: 75%" onclick="page -= 1; loadCredits()">`
    } else return `
    <img class="gdButton" src="/assets/images/buttons/arrow-right.png" width="60vh" style="position: absolute; top: 45%; left: 75%" onclick="page += 1; loadCredits()">
    <img class="gdButton" src="/assets/images/buttons/arrow-left.png" width="60vh" style="${y == 0 ? "display: none; " : ""}position: absolute; top: 45%; right: 75%" onclick="page -= 1; loadCredits()">`  
}

function closeModal() {
    return `<div class="center supercenter" style="width: 80vh; height: 43%; pointer-events: none;">
	<img class="closeWindow gdButton" src="/assets/images/buttons/close.png" height="25%" style="position: absolute; top: -24%; left: -7vh; pointer-events: all;" onclick="$('#credits').hide(); page = 1;"></div>`
}

/* shh, sneaky */
function reroute(url) {
    fetch("/api/credits").then(res => res.text()).then((res) => {
        res = JSON.parse(res.split("module.exports = ")[0]);
        console.log(res)
    
        /*// credits
        res.credits.forEach((x, y) => {
            $("#gdb_credits").append(creditsModal(y, x, res.credits.length));
        })
    
        // appendclose
        $("#gdb_credits").append(closeModal)*/
    })
}