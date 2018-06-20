function loadLayers()
{
		for(i = 0; i < layers.length; i++)
	{
		var c;
		
		if(!hasCategoty(layers[i].category))
		{
			if(layers[i].category != '')
			{
				c = addCategoryUI(layers[i].category, layers[i].name);
			}
			else
			{
				c = getCategoryContent(layers[i].category);
			}
				
		}
		else
		{
			c = getCategoryContent(layers[i].category);
		}
		
		if(layers[i].category != '')
		{
			var catTable = c.getElementsByTagName('table')[0];
		
			var layerItem = document.createElement('tr');
			
			var itemtd = document.createElement('td');

			var itemin = document.createElement('input');
			itemin.type = 'checkbox';
			itemin.name ='other';
			itemin.id = layers[i].name;
			itemin.onclick = showLayer;
			
			var itemtd2 = document.createElement('td');
			itemtd2.innerHTML = layers[i].name;
			
			itemtd.appendChild(itemin);
			layerItem.appendChild(itemtd);
			layerItem.appendChild(itemtd2);
			
			//layerItem.innerHTML = "<td><input onclick='showLayer(\""+layers[i].name+"\")' type='checkbox' name='other' id='"+layers[i].name+"' value='trafficLayer'/></td><td align='left'>"+layers[i].name+"</td>"
		
			catTable.appendChild(layerItem);
		}
		
	}
}

loadLayers();

function showLayer()
{
	for(i = 0; i < layers.length; i++)
	{
		if(layers[i].name == this.id)
		{
			if(!this.checked)
			{
				layers[i].clearFromMap();
			}
			else
			{
				layers[i].putOnMap();
			}
		}
	}
}

function getCategoryContent(cat)
{
	var accordion = document.getElementById('accordion');
	var e = accordion.getElementsByTagName("h3");
	
	for(j = 0; j < e.length; j++)
	{
		if(e[j].textContent == cat)
		{
			return accordion.getElementsByTagName('div')[j];
			break;
		}
		else if(j == e.length)
		{
			return false;
			break;
		}
	}
}


function hasCategoty(cat)
{
	var accordion = document.getElementById('accordion');
	var e = accordion.getElementsByTagName("h3");
	
	for(j = 0; j < e.length; j++)
	{
		if(e[j].textContent == cat)
		{
			return true;
			break;
		}
		else if(j == e.length)
		{
			return false;
			break;
		}
	}
}

function addCategoryUI(tag, id)
{
	var accordion = document.getElementById('accordion');
	var accorHeader = document.createElement('h3');
	var	accorContent = document.createElement('div');
	
	accorHeader.innerHTML = '<strong>'+tag+'</strong>';
	var contentTable = document.createElement('table');
	accorContent.appendChild(contentTable);
	
	accordion.appendChild(accorHeader);
	accordion.appendChild(accorContent);
	
	return accorContent;
}

function startVisible(name)
{
	for(i = 0; i < layers.length; i++)
	{
		if(layers[i].name == name)
		{
			layers[i].putOnMap();
			var checkbox = document.getElementById(name);
			checkbox.checked = true;
		}
	}
}

