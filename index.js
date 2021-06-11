var lower_bound = document.getElementById("lb");
var upper_bound = document.getElementById("ub");
var num_rows = document.getElementById("num_rows");
var data_table = document.getElementById("data_table")
var lb_arr = [];
var ub_arr = [];
var frequency = [];
var cum_frequency = [];
var total_fr = 0;
var sum = 0;
var test_median = 0;
var make_table = document.getElementById("make_table");
make_table.onclick=function(){
    var cls_length = Number(upper_bound.value) - Number(lower_bound.value);
    for(let i=0; i<Number(num_rows.value);i++){
        var row = document.createElement("tr");
        row.innerHTML='<td class="row_lb"></td> <td class="row_ub"></td> <td><input type="number" class="frequency" placeholder="Enter Frequency"></td>';
        data_table.appendChild(row);
        lb_arr[i]=Number(lower_bound.value)+i*cls_length;
        ub_arr[i]=Number(upper_bound.value)+i*cls_length;
    }
    var row_lb = document.getElementsByClassName("row_lb");
    var row_ub = document.getElementsByClassName("row_ub");
    for(let i=0;i<Number(num_rows.value);i++){
        row_lb[i].innerHTML = lb_arr[i];
        row_ub[i].innerHTML = ub_arr[i];
    }
}
//fill sample fuction
var sample = document.getElementById("fill_sample");
sample.onclick=function(){
    lower_bound.value = 5;
    upper_bound.value = 10;
    num_rows.value = 7;
}
var sample2 = document.getElementById("fill_sample2");
sample2.onclick=function(){
    let sample_fr = [6,8,17,21,15,11,2]
    var row_fr = document.getElementsByClassName("frequency");
    for (let i=0;i<Number(num_rows.value);i++){
        row_fr[i].value = sample_fr[i];
    }
}

var submit = document.getElementById("submit");
submit.onclick=function(){
    var row_fr = document.getElementsByClassName("frequency");
    for(let i=0; i<Number(num_rows.value);i++){
        frequency[i]=Number(row_fr[i].value);
    }
    let note = document.getElementById("note")
    note.innerHTML="<p>Now you can click on Calculate.</p>";
}
// Mean Calculation
var mean= document.getElementById("mean");
function calculateMean(){
    for(let i=0; i<Number(num_rows.value);i++){
        sum = sum + ((lb_arr[i]+ub_arr[i])/2)*frequency[i];
        total_fr = total_fr +frequency[i];
    }
    var mean_value = document.getElementById("mean_value");
    mean_value.innerHTML=`Average = ${sum/total_fr}`;
}
// Median Calculation
var median = document.getElementById("median");
function calculateMedian(){
    cum_frequency[0] = frequency[0];
    for (let i=1;i<Number(num_rows.value);i++){
        cum_frequency[i] = frequency[i] +cum_frequency[i-1];
    }
    function mid_fr(){
        for (let i=0;i<Number(num_rows.value);i++){
            if (total_fr/2 < cum_frequency[i]){
                return i;
            }
        }
    }
    var cls_len = ub_arr[0]-lb_arr[0];
    var fr_median = frequency[mid_fr()];
    var median_value = document.getElementById("median_value");
    median_value.innerHTML= `Median=${lb_arr[mid_fr()]+(cls_len*((total_fr/2)-cum_frequency[mid_fr()-1]))/fr_median}`;
    test_median = lb_arr[mid_fr()]+(cls_len*((total_fr/2)-cum_frequency[mid_fr()-1]))/fr_median;
}

//  Mode Calculation
var mode = document.getElementById("mode");
function calculateMode(){
    function fr_mode(){
        var max = frequency[0];
        var max_fr_index = 0;
        for (let i=1;i<Number(num_rows.value);i++){
            if(frequency[i]>max){
                max = frequency[i];
                max_fr_index = i;
            }
        }
        return max_fr_index;
    }
    var cls_len = ub_arr[0]-lb_arr[0];
    var mode_value = document.getElementById("mode_value");
    mode_value.innerHTML= `Mode=${lb_arr[fr_mode()]+cls_len*((frequency[fr_mode()]-frequency[fr_mode()-1])/(2*frequency[fr_mode()]-frequency[fr_mode()-1]-frequency[fr_mode()+1]))}`;
}

//      Complete Analysis Calculation
var com_stat = document.getElementById("com_stat");
com_stat.onclick=function(){
    // mean part
    for(let i=0; i<Number(num_rows.value);i++){
        sum = sum + ((lb_arr[i]+ub_arr[i])/2)*frequency[i];
        total_fr = total_fr +frequency[i];
    }
    var avg = sum/total_fr;

    // median part
    cum_frequency[0] = frequency[0];
    for (let i=1;i<Number(num_rows.value);i++){
        cum_frequency[i] = frequency[i] +cum_frequency[i-1];
    }
    function mid_fr(){
        for (let i=0;i<Number(num_rows.value);i++){
            if (total_fr/2 < cum_frequency[i]){
                return i;
            }
        }
    }
    let cls_len = ub_arr[0]-lb_arr[0];
    let fr_median = frequency[mid_fr()];
    let mdn = lb_arr[mid_fr()]+(cls_len*((total_fr/2)-cum_frequency[mid_fr()-1]))/fr_median;

    // mode part
    function fr_mode(){
        var max = frequency[0];
        var max_fr_index = 0;
        for (let i=1;i<Number(num_rows.value);i++){
            if(frequency[i]>max){
                max = frequency[i];
                max_fr_index = i;
            }
        }
        return max_fr_index;
    }
    var mod = lb_arr[fr_mode()]+cls_len*((frequency[fr_mode()]-frequency[fr_mode()-1])/(2*frequency[fr_mode()]-frequency[fr_mode()-1]-frequency[fr_mode()+1]));

    // standard deviation
    var std_sum = 0;
    for (let i=0;i<Number(num_rows.value);i++){
        std_sum = std_sum + frequency[i]*((((lb_arr[i]+ub_arr[i])/2)-avg)*(((lb_arr[i]+ub_arr[i])/2)-avg));
    }
    var std_dev = Math.sqrt(std_sum/total_fr).toFixed(3);
    var variance = std_sum/total_fr;
    var skew = (avg-mod)/std_dev;
    // kurtosis
    var kurt_sum = 0;
    for (let i=0;i<Number(num_rows.value);i++){
        kurt_sum = kurt_sum + frequency[i]*((((lb_arr[i]+ub_arr[i])/2)-avg)*(((lb_arr[i]+ub_arr[i])/2)-avg)*(((lb_arr[i]+ub_arr[i])/2)-avg)*(((lb_arr[i]+ub_arr[i])/2)-avg));
    }
    var kurt = kurt_sum/(total_fr*variance*variance);

    var com_stat_value = document.getElementById("com_stat_value");
    com_stat_value.innerHTML= `<p>Midvalues x Frequency = ${sum}</p><p>Total sum of Frequencies = ${total_fr}</p><p>Mean = ${avg.toFixed(3)}</p>\n<p>Median = ${mdn.toFixed(3)}</p>\n<p>Mode = ${mod.toFixed(3)}</p>\n<p>Standard deviation = ${std_dev}</p>\n<p>Variance = ${variance.toFixed(3)}</p>\n<p>Skewness = ${skew.toFixed(4)}</p>\n<p>Kurtosis = ${kurt.toFixed(4)}</p>`;
    
    let sug = document.getElementById("sug");
    sug.innerHTML="<p>Now Click On Reset Table to start new Calculation.</p>"
    var grid_child = document.getElementsByClassName("grid_child");
    for(let j=1;j<grid_child.length;j++){
        grid_child[j].style.display = "none";
    }
}
var reload = document.getElementById("reload");
reload.onclick= function(){
    location.reload();
}
var reload = document.getElementById("reload1");
reload1.onclick= function(){
    location.reload();
}
