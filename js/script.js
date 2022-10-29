
const container = document.querySelector('.container');
const parallaxBlock = document.querySelector('.parallax');
window.addEventListener('mousemove', parallax);
//slider
const slider = document.querySelector('.slider');
const sliderItems = slider.querySelectorAll('.slider-item');
//buttons for slider
const sliderBtnNext = document.querySelector('.arrow-next')
const sliderBtnPrev = document.querySelector('.arrow-prev')
let sliderCount = 0;
let sliderTrackerCheck = true;
init();
window.addEventListener('resize', init);
const sliderTrackerItems = document.querySelectorAll('.slider-tracker li');
sliderTrackerItems[0].classList.add('active');
sliderBtnNext.addEventListener('click', function(){
	sliderTrackerItems[sliderCount].classList.remove('active');
	if (sliderCount < sliderItems.length-1){
		sliderCount++;
	}
	else{
		sliderCount=0;
	}
	sliderTrackerItems[sliderCount].classList.add('active');
	slider.style.transform = `translate(-${sliderCount * sliderItems[sliderCount].clientWidth}px ) `
})
sliderBtnPrev.addEventListener('click', function(){
	sliderTrackerItems[sliderCount].classList.remove('active');
	if (sliderCount > 0){
		sliderCount--;
	}
	else{
		sliderCount = sliderItems.length-1;
	}
	sliderTrackerItems[sliderCount].classList.add('active');

	slider.style.transform = `translate(-${sliderCount * sliderItems[sliderCount].clientWidth}px ) `
})

//degree
const degreeItems = document.querySelectorAll('.degree__item');
degreeItems.forEach(i => i.addEventListener('click', function(){
	i.classList.toggle('active');
}))

//initialization



function init(){ // for slider
	let sliderWidth=0;
	const sliderTracker = document.querySelector('.slider-tracker');
	//add tracker
	if (sliderTrackerCheck){
		sliderItems.forEach(function(){
			sliderTracker.insertAdjacentHTML(
				'beforeend',
				`<li></li>`
				);
		})
		let trackerWidth = 0;
		sliderTracker.querySelectorAll('li').forEach(function(i){
			trackerWidth += i.clientWidth + 10;
		})
		trackerWidth -=10;
		sliderTracker.style.width= `${trackerWidth}px`
		sliderTrackerCheck=false;
	}
	//width for sliderblock
	sliderItems.forEach(function(i){
		i.style.width=`${container.clientWidth}px`;
		sliderWidth += container.clientWidth;
	})
	slider.style.width =  `${sliderWidth}px`;

	slider.style.transform = `translate(-${sliderCount * sliderItems[sliderCount].clientWidth}px ) `

	if (window.innerWidth < 1100){
		console.log('shfja')
		sliderItems.forEach(function(i){
			i.style.padding = `0 0 0 0px`;
			i.style.gap = '50px';
		})
	}
	else{
		sliderItems.forEach(function(i){
			i.style.padding = `0 0 0 100px`;
		})
	}
	//console.log('asd' + sliderWidth);
}

//header link smooth 
const headerLinks = document.querySelectorAll('.header__link');
headerLinks.forEach((item,index) => item.addEventListener('click', function(e){
	e.preventDefault();
	switch (index){
		case 0:
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
		break;
		case 1:
		scrollToTargetAdjusted('degree')
		break;
		case 2:
		scrollToTargetAdjusted('review')
		break;
		case 3:
		scrollToTargetAdjusted('courses')
		break;
		case 4:
		scrollToTargetAdjusted('teachers')
		break;
		case headerLinks.length-1:
		document.querySelector('.contacts').classList.add('active');
		document.querySelector('.content').classList.add('blur');
		document.querySelector('.parallax').classList.add('blur');
		document.querySelector('body').classList.add('lock');
		overflow.style.display ='block';
		break;
	}
}));


//close btn for all the pop-ups
const overflow =document.querySelector('.overflow');


const closeBtn = document.querySelectorAll('.close-btn');
closeBtn.forEach(i => i.addEventListener('click', function(){
	document.querySelectorAll('.pop-up').forEach(function(i){
		i.classList.remove('active');
	})
	document.querySelector('body').classList.remove('lock');
	document.querySelector('.content').classList.remove('blur');
	document.querySelector('.parallax').classList.remove('blur');
	overflow.style.display ='none';

}))

//footer contacts
const footerLinkContacts = document.querySelector('.footer .footer__link');
footerLinkContacts.addEventListener('click', function(e){
	e.preventDefault();
	document.querySelector('.contacts').classList.add('active');
	document.querySelector('.content').classList.add('blur');
	document.querySelector('.parallax').classList.add('blur');
	document.querySelector('body').classList.add('lock');
	overflow.style.display ='block';
})



//filter for courses
const tagsBtn = document.querySelectorAll('.courses__tag-item');
const coursesList = document.querySelector('.courses__list');
const coursesItems = coursesList.querySelectorAll('li')
tagsBtn.forEach((item,index) => item.addEventListener('click', function(){
	tagsBtn.forEach(function(i){
		i.classList.remove('active');
	})
	item.classList.add('active');
	filter(indexToId(index));
}))


function indexToId(index){
	switch (index){
		case 0:
		return 'web';
		case 1:
		return 'python';
		case 2:
		return 'cLang';
		case 3:
		return 'machines';
	}
}
function rowDes(length){
	if (length >= 3){
		coursesList.style.justifyContent='space-between';
	}
	else{
		coursesList.style.justifyContent='';
	}
}
function filter(id){
	let itemLength=0;
	coursesItems.forEach(function(i){
		i.style.display='none';
		if (i.id == id){
			i.style.display = 'block';
			itemLength++;
		}
	})
	rowDes(itemLength);
}

//courses btn event
const signCoursePopUp = document.querySelector('.signCourse');
const coursesItemBtns = document.querySelectorAll('.courses__list-item-btn');
const form = document.querySelector('form');
const formBtn = document.querySelector('form button');
console.log(formBtn);
let first = true;
formBtn.addEventListener('click',function(e){
	let invalid = false;
	for (let i=0; i < form.children.length-2; i++){
		if (!form.children[i].value){
			invalid = true;
			form.children[i].classList.add('invalid')
		}
		else{
			form.children[i].classList.remove('invalid')
		}
	}
	if (invalid){
		e.preventDefault(); //
	}
	if (first){
		document.querySelector('.signCourse-errorMessage').insertAdjacentHTML(
			'afterbegin',
			'Ошибка в указанных данных.'
			)
		first= false;
	}
})

coursesItemBtns.forEach((item,index) => item.addEventListener('click', function(){
	signCoursePopUp.classList.add('active');

	signCoursePopUp.querySelector('select').value = document.querySelectorAll('.courses__list-item')[index].dataset.course;
	console.log(signCoursePopUp.querySelector('select').value)

	document.querySelector('.content').classList.add('blur');
	document.querySelector('.parallax').classList.add('blur');
	document.querySelector('body').classList.add('lock');
	overflow.style.display ='block';
}))



function scrollToTargetAdjusted(e){
	var element = document.getElementById(e);
	var headerOffset = document.querySelector('.header').clientHeight;
	var elementPosition = element.getBoundingClientRect().top;
	var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

	window.scrollTo({
		top: offsetPosition,
		behavior: "smooth"
	});
}

/*
let coursesBool= false;
window.addEventListener('scroll', function(){
	console.log('asfasf')
	if (onScreen(document.querySelector('#courses'))){
		coursesBool= true;
		console.log('br')
		document.querySelector('.header').classList.remove('change');
	}
	else{
		coursesBool=false;
	}

	if (onScreen(document.querySelector('#review')) && !(coursesBool)){
		console.log('br1')
		document.querySelector('.header').classList.add('change')
	}
	else{
		document.querySelector('.header').classList.remove('change')
	}
})
*/




function parallax(event){
	document.querySelectorAll('.parallax__image-eyes').forEach(item => {
		let speedX = 30
		let speedY = 60;
		//console.log(event.clientY)
		let coordX, coordY;
		if (event.clientY < window.innerHeight/3){
			coordY = event.clientY * speedY/1000 - 20
			if (event.clientX < window.innerWidth / 3){
				coordX = event.clientX * speedX/1000 - 30;
			}
			else if (event.clientX > window.innerWidth*2 / 3){
				coordX = coordX = event.clientX * speedX/1000 - 10;
			}
			else {
				coordX = event.clientX * speedX/1000 -20;
			}
		}
		else if (event.clientY > window.innerHeight*3 /4){
			coordY = event.clientY * speedY/1000
			if (event.clientX < window.innerWidth / 3){
				coordX = event.clientX * speedX/1000 - 30;
			}
			else if (event.clientX > window.innerWidth*2 / 3){
				coordX = coordX = event.clientX * speedX/1000 - 10;
			}
			else {
				coordX = event.clientX * speedX/1000 -20;
			}
		}
		else{
			coordY=  event.clientY * speedY/1000;
			if (event.clientX < window.innerWidth / 3){
				coordX = event.clientX * speedX/1000 - 30;
			}
			else if (event.clientX > window.innerWidth*2 / 3){
				coordX = coordX = event.clientX * speedX/1000 - 10;
			}
			else {
				coordX = event.clientX * speedX/1000 -20;
			}
		}
		item.style.transform = `translate(${coordX}px, ${coordY}px`;
	})
}


function onScreen (el) { //if the element is on the screen
	var rect = el.getBoundingClientRect();
	return (
		Math.floor(rect.bottom-70) <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
		rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
		);
}


