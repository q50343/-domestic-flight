var DepartureAirport = document.querySelector('.DepartureAirport');
var ArrivalAirport = document.querySelector('.ArrivalAirport');
var timer = document.querySelector('.time');
var wrapper = document.querySelector('.wrapper');

var xhr = new XMLHttpRequest();
xhr.open('Get','http://ptx.transportdata.tw/MOTC/v2/Air/FIDS/Flight?$top=30&$format=JSON',true);
xhr.send(null);
xhr.onload = function(){
    
    if(xhr.status >= 200 && xhr.status < 400){
        console.log(xhr.responseText);
        var str = JSON.parse(xhr.responseText);
        console.log(str[3])
        for(var i=0;i<str.length;i++){
                      
            str.sort(function(a,b){
                return a.ScheduleDepartureTime > b.ScheduleDepartureTime ? 1 : -1;
            })
            
            console.log(str[i].ScheduleDepartureTime);
            var place = document.createElement('div');
            // DepartureTime
            
            var ScheduleDepartureTime = str[i].ScheduleDepartureTime;
            var Departure = ScheduleDepartureTime.split('T');
            // ActualArrival
            var ScheduleArrivalTime = str[i].ScheduleArrivalTime;
            var Arrival = ScheduleArrivalTime.split('T');
            
            var Today=new Date();
            timer.innerHTML = `
            <i class="far fa-calendar-alt"></i> ${Today.getFullYear()}-${(Today.getMonth()+1)}-${Today.getDate()}
            `;
                        
            wrapper.appendChild(place);
            place.innerHTML = `        
            <div class="row">        
            <div class="col-3"><h2>${str[i].AirlineID}<br><span>${str[i].AirlineID}${str[i].FlightNumber}</span><h2></div>
            <div class="col-9"><h4>${str[i].DepartureAirportID}<br><span>${Departure[1]}<br>${str[i].ArrivalRemark
            }</span></h4> <i class="fas fa-plane"></i></i><h4 class="arrive"> ${str[i].ArrivalAirportID}<br><span>${Arrival[1]}<br>${str[i].ArrivalRemark
            }</span></h4></div>                       
            </div>
            `    
        }        
    }else{
        alert('資料錯誤')
    }
}
