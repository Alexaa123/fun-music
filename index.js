$(function(){
    $.get('index.json').then(function(obj){
        let items = obj
        console.log(items)
        items.forEach(e => {
           let listNumber = e.id.length >1 ? e.id+'' : '0'+e.id
           let $li = $('<li><a href="./song.html?id='+e.id +'"><h3>'+e.name+'</h3><p><svg class="icon-sq"><use xlink:href="#icon-sq"></use></svg>'+ e.author+'-'+e.album+ '</p><svg class="icon-play"><use xlink:href="#icon-play"></use></svg></a></li>')
           let $hotSong = $('<a href="./song.html?id='+e.id +'"><div class ="songNumber">'+listNumber+'</div><div class ="songMusic"><h3>'+e.name+'</h3>\
               <p><svg class="icon-sq"><use xlink:href="#icon-sq"></use></svg>'+ e.author+'-'+e.album+ '</p>\
               <svg class="icon-play"><use xlink:href="#icon-play"></use></svg></div></a>')
      


            $('.hotMusic').append($hotSong)
           $('#lastMusic').append($li)    
        $('.loading').remove()
        });
    })

    $('.chooseList').on('click','ol.tabItems li',function(e){
        $li = $(e.currentTarget).addClass('active')
        $li.siblings().removeClass('active')
        let index = $li.index()
        $('.wholePage > li').eq(index).addClass('active').siblings().removeClass('active')
        $li.trigger('tabchange',index)
    })

    $('.chooseList').on('tabchange',function(e,index){
        if(index ===1){
            if($('.wholePage > li').eq(index).attr('data-downLoad') === 'yes'){
                return
            }
            $.get('page2.json').then(function(obj){
                console.log(obj)
                $('.wholePage > li').eq(index).attr('data-downLoad','yes')
            })
        }
        else if(index ===2){
            if($('.wholePage > li').eq(index).attr('data-downLoad') === 'yes'){
                return
            }
            $.get('page3.json').then(function(obj){
                console.log(obj)
                $('.wholePage > li').eq(index).attr('data-downLoad','yes')
            })

        }

    })
    let timer = undefined
    if($('#searchSong').val() !== ''){
        $('.holder').remove()
    }
    $('#searchSong').on('input',function(e){
        $('.holder').remove()
        $('#output').empty()
        let $input = $(e.currentTarget)
        let val = $input.val().trim()
        if( val ===''){return}
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(function(){
            search(val).then((result)=>{
                if(result.length !==0){
                    console.log(result)
                    $('#output').append(result.map((r)=>{ 
                        return  $output = $('<li><a href="./song.html?id='+r.id +'"><h3>'+r.name+'</h3></a></li>')
                    }))
                }
                else{
                    $('#output').text('没有结果')
                }
            })

        },300)


    })


    function search(keyword){
        return new Promise((resolve,reject)=>{
            var database =  [
                { "id":"1" , "name":"可能否",},
                {"id":"2" ,"name":"讲真的",},
                {"id":"3" ,"name":"往后余生",},
                {"id":"4" ,"name":"浪人琵琶",},
                {"id":"5" ,"name":"答案",},
                {"id":"6" ,"name":"渐渐",},
                {"id":"7" ,"name":"给陌生的你听",},
                {"id":"8" ,"name":"烟火里的尘埃",},
                {"id":"9" ,"name":"纸短情长",},
                {"id":"10" ,"name":"明智之举",}]
            
            let result = database.filter(function(item){
                return item.name.indexOf(keyword) >=0
            })
            setTimeout(function(){
                console.log('搜到'+keyword+'结果')
                resolve(result)
            },(Math.random()*1000 + 500))
        })
    }
    window.search = search

})