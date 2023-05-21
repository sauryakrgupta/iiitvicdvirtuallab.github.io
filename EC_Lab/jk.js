let y = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let c = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let a = 1;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function generate() {
    let sw = document.querySelectorAll('.switch input');
    let arr = [0, 0, 0];
    sw.forEach((s, i) => {
        if (s.checked) arr[i] = 1;
    });
    let inpclk = document.getElementById('inp_clk');
    let inpj = document.getElementById('inp_j');
    let inpk = document.getElementById('inp_k');
    if (inpclk.value == "" || inpj.value == "" || inpk.value == "") {
        gen(arr[0], arr[1], arr[2]);
    }
    else {
        inpclk = inpclk.value.split(" ");
        inpj = inpj.value.split(" ");
        inpk = inpk.value.split(" ");
        for (let i = 0; i < inpclk.length; i++) {
            gen(inpclk[i], inpj[i], inpk[i]);
            await sleep(500);
        }
    }
}

function reset() {
    document.getElementById('clk').innerHTML = "";
    document.getElementById('q').innerHTML = "";
    y = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    c = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    a = 1;
}

function gen(clk, j, k) {
    if (clk == "0") {
        c[a] = 0;
        clk = "1";
    }
    else {
        c[a] = 1;
        clk = "0";
    }
    if (clk == "0") {
        y[a] = y[a - 1];
    } else {
        if (j == "0" && k == "0")
            y[a] = y[a - 1];
        else if (j == "0" && k == "1")
            y[a] = 0;
        else if (j == "1" && k == "0")
            y[a] = 1;
        else if (j == "1" && k == "1")
            if (y[a - 1] == 0)
                y[a] = 1;
            else
                y[a] = 0;
    }
    a = a + 1;
    let e = a;
    let s = 1;
    if (a >= 10) {
        e = y.length;
        s = y.length - 9;
    }

    let clkdiv = document.getElementById('clk');
    clkdiv.innerHTML = "";
    let clkhtml = '';
    cp = c[s - 1];
    c.slice(s, e).forEach((cl, i) => {
        let f = 0;
        if (i && cp - cl != 0) {
            clkhtml += `
                <div class="vert"></div>
            `
            f = 1;
        }
        let width = f ? "80px" : "82px";
        if (cl) {
            clkhtml += `
                <div style="border-top:2px solid #2196F3;width:${width}" class="hor"></div>
            `
        }
        else {
            clkhtml += `
                <div style="border-bottom:2px solid #2196F3;width:${width}" class="hor"></div>
            `
        }
        cp = cl;
    });
    clkdiv.innerHTML = clkhtml;


    let ydiv = document.getElementById('q');
    ydiv.innerHTML = "";
    let yhtml = '';
    yp = y[s - 1];
    y.slice(s, e).forEach((q, i) => {
        let f = 0;
        if (i && yp - q != 0) {
            yhtml += `
                <div class="vert"></div>
            `
            f = 1;
        }
        let width = f ? "80px" : "82px";
        if (q) {
            yhtml += `
                <div style="border-top:2px solid #2196F3;width:${width}" class="hor"></div>
            `
        }
        else {
            yhtml += `
                <div style="border-bottom:2px solid #2196F3;width:${width}" class="hor"></div>
            `
        }
        yp = q;
    });
    ydiv.innerHTML = yhtml;
}


{/* <div class="vert"></div> */ }
{/* <div class="hor"></div> */ }