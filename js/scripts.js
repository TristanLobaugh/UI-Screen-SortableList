$(document).ready(function(){
	let people = [];
	let $list = $('#list');
	let sortBy = "age";
	let sortArrayBy;
	let sortOrder = "asc";


	$.ajax({
		type: 'GET',
		url: 'http://demo1227708.mockable.io/people',
		success: function(data){
			$.each(data, function(i, person){
				people.push([person.firstName, person.lastName, person.age])
			});
			sortPeople();
		}
	});

	$('#sort-form').submit(function(event){
		sortBy = event.currentTarget[0].value;
		if(event.currentTarget[1].checked == true){
			sortOrder = "asc";
		}else{
			sortOrder = "dsc";
		}
		sortPeople();
		event.preventDefault()
	});

	function sortPeople(){
		if(sortBy === "age"){
			sortArrayBy = 2;
		}else if(sortBy === "firstName"){
			sortArrayBy = 0;
		}else{
			sortArrayBy = 1;
		}

		people.sort(compare);

		function compare(a, b){
			if(sortOrder === "asc"){
				if(a[sortArrayBy] === b[sortArrayBy]){
					return 0;
				}else{
					return (a[sortArrayBy] < b[sortArrayBy]) ? -1 : 1;
				}
			}else{
				if(a[sortArrayBy] === b[sortArrayBy]){
					return 0;
				}else{
					return (a[sortArrayBy] > b[sortArrayBy]) ? -1 : 1;
				}
			}
		}

		appendHTML();
	}

	function appendHTML(){
		$('#list').html("");
		$.each(people, function(i, person){
			if(person[2] < 21){
				$list.append('<div class="person under-age"><div class="name-wrapper"><span class="person-firstName">' + person[0] + ' </span><span class="person-lastName">' + person[1] + '</span></div><div class="person-age">Age: ' + person[2] + '</div></div>');
			}else{
				$list.append('<div class="person"><div class="name-wrapper"><span class="person-firstName">' + person[0] + ' </span><span class="person-lastName">' + person[1] + '</span></div><div class="person-age">Age: ' + person[2] + '</div></div>');
			}
		});
	}

});