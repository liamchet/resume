const fs=require('fs');const path=require('path');const {build}=require('esbuild');
(async()=>{
 const result=await build({entryPoints:[path.join(__dirname,'islands.jsx')],bundle:true,write:false,outdir:path.join(__dirname,'build'),minify:true,format:'iife',jsx:'automatic',target:['es2020'],define:{'process.env.NODE_ENV':'"production"'},legalComments:'inline'});
 const js=result.outputFiles.find(f=>f.path.endsWith('.js')).text;
 const css=result.outputFiles.find(f=>f.path.endsWith('.css')).text;
 let html=fs.readFileSync(path.join(__dirname,'profile.template.html'),'utf8');
 html=html.replace('<!-- REACT_BITS_BUNDLE -->','<style>'+css+'</style><script>'+js.split('</script').join('<'+String.fromCharCode(92)+'/script')+'</script>');
 const root=path.resolve(__dirname,'../..');
 for(const folder of [root,path.join(root,'dist')]){fs.mkdirSync(folder,{recursive:true});for(const name of ['index.html','Liam_Chetrit_Profile.html'])fs.writeFileSync(path.join(folder,name),html);}
 fs.writeFileSync(path.join(root,'dist','THIRD_PARTY_NOTICES.txt'),fs.readFileSync(path.join(__dirname,'components','LICENSE-React-Bits.md')));
 console.log('Built self-contained portfolio with React Bits; no runtime CDN.');
})().catch(e=>{console.error(e);process.exit(1)});
