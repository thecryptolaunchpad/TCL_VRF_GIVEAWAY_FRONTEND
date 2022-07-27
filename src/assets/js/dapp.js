
console.log(document.getElementById("menu"))

async function getContests() {
    let cardContainer = document.getElementById("contestContainer")
    try {
      await  axios.get('http://localhost:3030/getContests').then((response)=>{
            console.log(response.data)
           // data.forEach(resultArray => {});
             let el  ='' ;
            let  timerEl = []
           response.data.forEach((item, index)=>{

                el = el  + getCard(
                    item.contestName,
                    item.imageUrl,
                    item.numberOfWinners, 
                    item.prizeWorth,
                    item.announcementDate,
                    item.contestants_addresses,
                    index,
                    item.winners
                    
                    );
                    timerEl.push({time:item.announcementDate ,id:`contest_${index}`})
           })
          console.log(timerEl)

            cardContainer.innerHTML = el
            timerEl.forEach((item)=>{
               timerListener(item.time, item.id)

            })


            //populate here
           
        });
      
      
    
    } catch (error) {
        console.log(error);
    }
}
getContests() ;

function updateModalList(addresses , elId){
     let adds = (addresses.split(","))
    
    let el = document.getElementById(elId) ;
    console.log(adds)
    let trs = '' ;
     if(el){
          adds.forEach((item , index)=>{
             trs = trs + 	`<tr>
							<th scope="row">${index +1 }</th>
							<td>${item}</td>
						</tr>`
          }) ;
     let tableContent = `
     <thead>
		<tr>
			<th >#</th>
			<th style ="text-align:center ;">Address</th>
	   </tr>
	</thead>
	<tbody>${trs}</tbody>
                     `
    if(adds[0] == '' && elId =="result_model")
       tableContent = `<div style ="display: flex;justify-content: center;"><strong>Winners not announced yet</strong><div>` ;
      
      el.innerHTML  = tableContent 
     }
}

const getCard = ( name,imageUrl,
                  noOfWinners,
                  prizeWorth, time ,
                 paricipants, 
                 index ,
                 winners
                 ) => {
     //timerListener(time, `contest_${index}`)
     return `
          <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <div class="tile">
                    <div class="wrapper">
                       
                        <h3 class="text-center alert alert-info mb-0">${name}</h3>
                        <div class="banner-img">
                            <img src="${imageUrl}" alt="Image 1">
                        </div>

                        <div class="dates">
                          <div class="ends">
                              <strong>ENDS ON</strong> ${(new Date(time*1000)).toDateString()}
                          </div>
                          <hr>
                          <div class="ends">
                            <strong>RESULT ON</strong>
                            <div id = ${`contest_${index}`} ></div>
                        
                        </div>
                      </div>
                        <div class="stats">

                            <div>
                                <strong>Prize Worth</strong> ${prizeWorth}
                            </div>

                            <div>
                                <strong>participant</strong> ${paricipants.length}
                            </div>

                            <div>
                                <strong>Winners</strong> ${noOfWinners}
                            </div>

                        </div>

                        <div class="footerair">
                          <a type="button" class="Cbtn Cbtn-primary" data-toggle="modal" data-target="#modalParticipants" 
                          onclick = "updateModalList('${(paricipants)}' ,'participants_address')">participants</a>
                          <a type="button" class="Cbtn Cbtn-danger" data-toggle="modal" data-target="#modalResult"
                           onclick = "updateModalList('${(winners)}' ,'result_model')">Result</a>
                        </div>
                    </div>
                </div> 
            </div>
     `

}

 function timerListener(time, id){
    setInterval(()=>{
        console.log(id)
     document.getElementById(id).innerHTML =    timer(time)
    }, 1000);

 }

function timer(countDownDate) {
var now = new Date().getTime();
var timeleft = countDownDate*1000 - now;
    
var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
console.log(days,hours, minutes , seconds)
 return `
   
             ${days}:${hours}:${minutes}:${seconds}
	  
 `
}
