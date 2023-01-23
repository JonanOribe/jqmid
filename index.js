const $ = (arg) => {
    if(typeof arg === 'function'){
        document.addEventListener('DOMContentLoaded',arg);
        return
    }

    if(typeof arg === 'string'){
        const elements = document.querySelectorAll(arg)

        elements.css = (...args) => {
            const [property, value] = args
            elements.forEach(el => {
                el.style[property] = value
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
    .on('click',() => {
        alert('Ey!')
    })

    $('li').each((index,el) => {
        if(index===0) $(el).css('color','green')
        if(index===1) $(el).css('color','orange')
        if(index===2) $(el).css('color','yellow')
    })
})