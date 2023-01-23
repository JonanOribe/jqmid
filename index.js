const $ = (arg) => {
    if(typeof arg === 'function'){
        document.addEventListener('DOMContentLoaded',arg);
        return
    }

    //CSS selector
    if(typeof arg === 'string'){
        const elements = document.querySelectorAll(arg)

        elements.css = (...args) => {
            const [property, value] = args
            const isString = typeof property === 'string'

            elements.forEach(el => {
                if(isString) el.style[property] = value
                else{
                    const entriesCSS = Object.entries(property)
                    console.log(entriesCSS);
                    entriesCSS.forEach(([property,value]) =>{
                        el.style[property] = value
                    })
                }
            });
        return elements;
        }
        return elements;
    }
}

$(() => {
    console.log('DOMContentLoaded');

    $('button')
    .css('background','red')
    .css('border','blue')
    .css({
        padding: '16px',
        borderRadius: '4px'
    })
    /*
    .on('click',() => {
        alert('Ey!')
    })
    */

    $('li').forEach((index,el) => {
        if(index===0) $(el).css('color','green')
        if(index===1) $(el).css('color','orange')
        if(index===2) $(el).css('color','yellow')
    })
})