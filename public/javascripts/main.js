var app = document.getElementById('app')
const setSize = (width,height) => {
    app.style.width = `${width}px`
    app.style.height = `${height}px`
}
setSize(window.innerWidth,window.innerHeight)
window.onresize = ()=> {
    setSize(window.innerWidth,window.innerHeight)
}
if (document.getElementById('prev-btn') != null) {
    document.getElementById('prev-btn').addEventListener('click', ()=> {
        var maxAlt = 0;
        document.querySelectorAll('img').forEach(image=>{
            image.classList.forEach(CLass=>{
                if(CLass.indexOf('alt-') > -1){
                    var CLassNum = parseInt(CLass.split('-')[1])
                    if (CLassNum > maxAlt) maxAlt = CLassNum
                }
            })
        })
        document.getElementById('show').classList.forEach(CLass=>{
            if(CLass.indexOf('alt-') >-1 ) {
                document.querySelectorAll(`.${CLass}`).forEach(image=>{
                    image.style.display = 'none'
                    image.id = ''
                })
                document.querySelectorAll(`.main-btn`).forEach(element=>{
                    element.classList.remove('main-btn')
                    element.classList.add('alt-btn')
                })
                var CLassNum = parseInt(CLass.split('-')[1])
                if (CLassNum == 0) CLassNum = maxAlt + 1
                document.querySelectorAll(`.alt-${CLassNum-1}`).forEach(image=>{
                    image.style.display = 'grid'
                    image.setAttribute('id','show')
                })
                document.querySelectorAll(`.alt-${CLassNum-1}-btn`).forEach(element=>{
                    element.classList.add('main-btn')
                    element.classList.remove('alt-btn')
                })
            }
        })
    })
}
if (document.getElementById('next-btn') != null) {
    document.getElementById('next-btn').addEventListener('click', ()=> {
        var maxAlt = 0;
        document.querySelectorAll('img').forEach(image=>{
            image.classList.forEach(CLass=>{
                if(CLass.indexOf('alt-') > -1){
                    var CLassNum = parseInt(CLass.split('-')[1])
                    if (CLassNum > maxAlt) maxAlt = CLassNum
                }
            })
        })
        document.getElementById('show').classList.forEach(CLass=>{
            if(CLass.indexOf('alt-') >-1) {
                document.querySelectorAll(`.${CLass}`).forEach(image=>{
                    image.style.display = 'none'
                    image.id = ''
                })
                document.querySelectorAll(`.main-btn`).forEach(element=>{
                    element.classList.remove('main-btn')
                    element.classList.add('alt-btn')
                })
                var CLassNum = parseInt(CLass.split('-')[1])
                if (CLassNum == maxAlt) CLassNum = -1
                document.querySelectorAll(`.alt-${CLassNum+1}`).forEach(image=>{
                    image.style.display = 'grid'
                    image.setAttribute('id','show')
                })
                document.querySelectorAll(`.alt-${CLassNum+1}-btn`).forEach(element=>{
                    element.classList.add('main-btn')
                    element.classList.remove('alt-btn')
                })
            }
        })
    })
}
if (document.getElementById('press-btn') != null) {
    document.querySelectorAll('.press-btn').forEach(element=>{
        element.addEventListener('click',()=>{
            element.classList.forEach(CLass=>{
                if (CLass.indexOf('alt-')> -1 && CLass.indexOf('alt-btn') < 0){
                    var shown = document.getElementById(`show`)
                    shown.style.display = 'none'
                    shown.id = ''
                    document.querySelectorAll(`.main-btn`).forEach(element=>{
                        element.classList.remove('main-btn')
                        element.classList.add('alt-btn')
                    })
                    var CLassNum = CLass.split('-')[1]
                    document.querySelectorAll(`.alt-${CLassNum}`).forEach(image=>{
                        image.style.display = 'grid'
                        image.setAttribute('id','show')
                    })
                    element.classList.remove('alt-btn')
                    element.classList.add('main-btn')
                }
            }) 
        })
    })
}
if (document.getElementById('auth-btn') != null) {
    document.getElementById('auth-btn').addEventListener('click', ()=> {
        document.getElementById('auth-report').style.display = 'grid'
        document.getElementById('product-report').style.display = 'none'
        document.getElementById('admin-report').style.display = 'none'
    })
}
if (document.getElementById('product-btn') != null) {
    document.getElementById('product-btn').addEventListener('click',()=>{
        document.getElementById('auth-report').style.display = 'none'
        document.getElementById('product-report').style.display = 'grid'
        document.getElementById('admin-report').style.display = 'none'
})
}
if (document.getElementById('admin-btn') != null) {
    document.getElementById('admin-btn').addEventListener('click',()=>{
        document.getElementById('auth-report').style.display = 'none'
        document.getElementById('product-report').style.display = 'none'
        document.getElementById('admin-report').style.display = 'grid'
    })
}