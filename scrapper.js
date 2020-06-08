const cherio=require('cherio');
const request=require('request');
const fs=require('fs');

var WriteStream=fs.createWriteStream("ImageLinks.txt","UTF-8");
const webName=""
const url=`https://${webName}/`
request(url,(err,res,html)=>{
  if (err){
    console.log(err);
    return err;
  }

  console.log("Success")
  const $=cherio.load(html);
  var imgN=1
  $("img").each((index,image)=>{
      var img=$(image).attr('src');
      var baseUrl=url;
      var link=baseUrl+img;

      console.log(link);
      WriteStream.write(link);
      var newDir=`./images/${webName}`
      if(!fs.existsSync(newDir)){
        fs.mkdirSync(newDir);
      }

      var filename=newDir+"/"+imgN++;
      request(link).pipe(fs.createWriteStream(filename));
  });
});
