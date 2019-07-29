var gameData = { 
//	population: 0, divine: 0 
	addQty: 1
	, job: {}
	, resource: { 
		divine: { caption: "Divine Power", qty: 1000, }
		, population: { caption: "Population", qty: 20, }
	}
};




function test() {
	gameData.job["Farmer"] = { qty: 123, };
	gameData.job["Woodcutter"] = { qty: 7, };
	var x = genJobUITable();

	gameData.resource["Production"] = { caption: "Production", qty: 125, }
	genResourceUITable();
/*
	gameData.job[1].name = 'Farmer';
	gameData.job[1].qty = 35;

	gameData.job[2].name = 'Woodcutter';
	gameData.job[2].qty = 5;
*/	
}

function message(msg, type) {
	if (!type)
		type = 0;	// default color
	switch(type) {
		case 1:	// warning
			myStyle = "color:red;";
			break;
		case 2:	// highlight
			myStyle = "color:yellow;";
			break;
		default:	
			myStyle = "";
	}
	
		
	var messageBody = document.getElementById('message');	
	messageBody.innerHTML += "<span style='" + myStyle + "'>" + msg + "</span><br>";
	// scroll to bottom
	messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
};


function refreshUI() {
// no longer innerHTML, but table! 
//  document.getElementById('population').innerHTML = gameData.population;
//  document.getElementById('divine').innerHTML = gameData.divine;
//	document.getElementById('population').innerHTML = gameData.resource['population'].qty; 
//	document.getElementById('divine').innerHTML = gameData.resource['divine'].qty; 
};


function addButtonRefreshUI() {
	buttonList = document.getElementsByClassName("btnAdd");
	for (i = 0; i < buttonList.length; i++) {
		buttonList[i].className = buttonList[i].className.replace(" active", "");
	}	

	curBtn = document.getElementById('add'+ gameData.addQty);
	curBtn.className += " active";  
}



function activateTab(evt, pageId) {
  var tabCtrl = document.getElementById('mytabD');
  var pageToActivate = document.getElementById(pageId);

  tablinks = document.getElementsByClassName("tabbutton");
  for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  evt.currentTarget.className += " active";

  for (var i = 0; i < tabCtrl.childNodes.length; i++) {
	  var node = tabCtrl.childNodes[i];

	  if (node.nodeType == 1) { /* Element */
		  node.style.display = (node == pageToActivate) ? 'block' : 'none';
	  }
  }
};


function saveGame() {
/*
	var save = {
		population: gameData.population,
		divine: gameData.divine,
		addQty: gameData.addQty
	};

	localStorage.setItem("save", JSON.stringify(save));
*/	
	localStorage.setItem("save", JSON.stringify(gameData));
	document.getElementById('debugContent').innerHTML = JSON.stringify(gameData);


	message("Game is saved.");
};



function loadGame(noMsg) {
	var save = JSON.parse(localStorage.getItem("save"));
	if (save == null) {
		if (!noMsg)
			message("Load game error!", 1);	// 1=red
		return false;
	}

	gameData = save;
	
	
	refreshUI();
	addButtonRefreshUI();
	var x = genJobUITable();

	document.getElementById('debugContent').innerHTML = JSON.stringify(gameData);
	message("Save game loaded.");
	return true;
};


function deleteGame() {
	var really = confirm('Really delete save?'); //Check the player really wanted to do that.
	if (really){
		document.cookie = ['save', '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=.', window.location.host.toString()].join('');
		localStorage.removeItem('save');
		message("Save game deleted!", 1);	// 1=red
	}	
};


function addUITable(groupElemName)
{
    var s="";
	
	if (groupElemName == "job")
		mylist = game.job.sort();
	if (groupElemName == "area")
		mylist = game.area.sort();


	mylist.forEach(function(item) {
		s+= "<tr><td width=150>" + item + "</td><td>0</td></tr>"
	});

	var groupElem = document.getElementById(groupElemName);
	document.getElementById('debugContent').innerHTML = "<pre>"+groupElem.innerHTML+"</pre>";
	document.getElementById('debugContent').innerHTML = groupElem.innerHTML;
    groupElem.innerHTML += s;
//    groupElem.onmousedown = onBulkEvent;


    return groupElem;
}


function genJobUITable()
{
    var s="";

	
	for (let key in gameData.job) {
		s+= "<tr><td width=150><div class='btnJob' onclick='addJobQty(" + '"' + key + '"' + ")'>" + key 
			+ "</div></td><td align=right width=100>" + gameData.job[key].qty 
			+ "</td></tr>"
	}
	
	var groupElem = document.getElementById("job");
    groupElem.innerHTML = s;
	
	return groupElem;
}


function genResourceUITable()
{
    var s="";

	
	for (let key in gameData.resource) {
		s+= "<tr><td width=90><div class='x'>" + gameData.resource[key].caption
			+ "</div></td><td align=right width=100>" + gameData.resource[key].qty 
			+ "</td></tr>"
	}
	
	var groupElem = document.getElementById("resource");
    groupElem.innerHTML = s;
	
	return groupElem;
}


function addButton(evt, lQty) {

  gameData.addQty = lQty;
  addButtonRefreshUI();
  
//  gameData.population = gameData.population + gameData.addQty;
//  gameData.divine = gameData.divine + gameData.addQty*2;
  refreshUI();
};


function addJobQty(jobName) {
	gameData.job[jobName].qty += gameData.addQty;
	var x = genJobUITable();
}


function initGame() {
	genResourceUITable();
}


function startGame() {
//	var x = addUITable("area");
	var x = genJobUITable();
	var isOK = loadGame(true);
	if (!isOK) {
		initGame();
	}
}


startGame();