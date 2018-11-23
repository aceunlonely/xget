var textFinder =require('./index')
var jest =require('jest')


var input ="Risa Oribe ( Oribe Risa, born June 24, 1987),\n"
+ " better known by her stage name LiSA (an acronym of Love is Same All),\n"
+ " is a Japanese singer, songwriter and lyricist from Seki, Gifu, \n" 
+ "signed to Aniplex under Sony Music Artists. After aspiring to become a musician early in life, \n"
+ "she started her musical career as the vocalist of the indie band Chucky.\n"
+ " Following Chucky's disbandment in 2005, LiSA moved to Tokyo in order to pursue a solo career,\n"
+ " making her major debut in 2010 singing songs for the anime television series Angel Beats! as one \n"
+ " of two vocalists for the fictional band Girls Dead Monster. In April 2011, \n" 
+ "she made her solo debut with the release of her mini-album Letters to \n"
+ " She performed at Animelo Summer Live in August 2010, Anime Expo in 2012, and is a regular guest at Anime Festival Asia "


var finder ={
    type:"text",
    position:[[0,'by'],2]
}
console.log(textFinder.run(input,finder,{}))
console.log('+++++++++++++++++++++++++++++++++++++++++')
finder ={
    position:{
        after:['2010',6],
        before:"regular"
    }
}
console.log(textFinder.run(input,finder,{}))
console.log('+++++++++++++++++++++++++++++++++++++++++')

finder ={
    position:[["2010",6],[-1,-2,"/A.ril 2011/"]]
}
console.log(textFinder.run(input,finder,{}))
console.log('+++++++++++++++++++++++++++++++++++++++++')

finder ={
    position:[["Risa,"],[-1,-2,"/, born/"]]
}
console.log(textFinder.run(input,finder,{}))
    test('test text finder',()=>{
        expect(textFinder.run(input,finder,{})).toEqual('Risa')
    })
console.log('+++++++++++++++++++++++++++++++++++++++++')

