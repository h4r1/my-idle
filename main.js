var gameData = { 
	population: 0, divine: 0 
	, addQty: 1
};

function refreshUI() {
  document.getElementById('population').innerHTML = gameData.population;
  document.getElementById('divine').innerHTML = gameData.divine;
};

function addButtonRefreshUI() {
	buttonList = document.getElementsByClassName("btnAdd");
	for (i = 0; i < buttonList.length; i++) {
		buttonList[i].className = buttonList[i].className.replace(" active", "");
	}	

	curBtn = document.getElementById('add'+ gameData.addQty);
	curBtn.className += " active";  
}

function addButton(evt, lQty) {
/*
  buttonList = document.getElementsByClassName("btnAdd");
  for (i = 0; i < buttonList.length; i++) {
        buttonList[i].className = buttonList[i].className.replace(" active", "");
  }
  evt.currentTarget.className += " active";  
*/
  gameData.addQty = lQty;
  addButtonRefreshUI();
  
  gameData.population = gameData.population + gameData.addQty;
  gameData.divine = gameData.divine + gameData.addQty*2;
  refreshUI();
  
};


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
	var save = {
		population: gameData.population,
		divine: gameData.divine,
		addQty: gameData.addQty
	};

	localStorage.setItem("save", JSON.stringify(save));
	document.getElementById('debugContent').innerHTML = JSON.stringify(save);


	alert("Save done!");
};



function loadGame() {
	var save = JSON.parse(localStorage.getItem("save"));
	if (save == null) {
		alert("Load game error!");
		return;
	}
	
	gameData.population = save.population;
	gameData.divine = save.divine;
	gameData.addQty = save.addQty;
	
	document.getElementById('debugContent').innerHTML = gameData.addQty;
	
	refreshUI();
	addButtonRefreshUI();
};


function deleteGame() {
	var really = confirm('Really delete save?'); //Check the player really wanted to do that.
	if (really){
		document.cookie = ['save', '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=.', window.location.host.toString()].join('');
		localStorage.removeItem('save');
		alert("Delete save done!");
	}	
};

function getResourceRowText(purchaseObj)
{
    // Make sure to update this if the number of columns changes.
    if (!purchaseObj) { return "<tr class='purchaseRow'><td colspan='6'/>&nbsp;</tr>"; }

    var objId = purchaseObj.id;
    var objName = purchaseObj.getQtyName(0);
    var s = "<tr id='"+objId+"Row' class='purchaseRow' data-target='"+objId+"'>";
 
    s += "<td><button data-action='increment'>"+purchaseObj.verb+" "+objName+"</button></td>";
    s += "<td class='itemname'>"+objName+": </td>";
    s += "<td class='number'><span data-action='display'>0</span></td>";
    s += "<td class='icon'><img src='images/"+objId+".png' class='icon icon-lg' alt='"+objName+"'/></td>";
    s += "<td class='number'>(Max: <span id='max"+objId+"'>200</span>)</td>";
    s += "<td class='number net'><span data-action='displayNet'>0</span>/s</td>";

    s += "</tr>";

    return s;
}


function addUITable(groupElemName)
{
    var s="";
	
	if (groupElemName == "job")
		mylist = game.job.sort();
	if (groupElemName == "area")
		mylist = game.area.sort();

//	document.getElementById('debugContent').innerHTML = mylist;

	mylist.forEach(function(item) {
		s+= "<tr><td width=150>" + item + "</td><td>0</td></tr>"
	});

	var groupElem = document.getElementById(groupElemName);
    groupElem.innerHTML += s;
//    groupElem.onmousedown = onBulkEvent;
    return groupElem;
}


function startGame() {
	var x = addUITable("area");
	var x = addUITable("job");
	loadGame();
}


startGame()
