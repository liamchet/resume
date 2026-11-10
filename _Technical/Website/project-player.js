(()=>{
 const cases=JSON.parse(document.getElementById('project-data').textContent);
 const dialog=document.getElementById('project-dialog');
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 let current=0,step=0,timer,paused=false,opener;
 const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
 function stop(){clearInterval(timer);timer=undefined;}
 function schedule(){stop();if(dialog.open&&!paused&&!reduced.matches&&!document.hidden)timer=setInterval(()=>setStep((step+1)%4),4800);dialog.classList.toggle('is-playing',!!timer);dialog.querySelector('.player-pause').textContent=reduced.matches?'Advance walkthrough':paused?'Play walkthrough':'Pause walkthrough';}
 function renderScene(p){const scene=p.scenes?.[step];if(!scene)return;const cards=(items,kind)=>items.map(([label,value])=>'<div class="'+kind+'"><span class="scene-copy"><small>'+esc(label)+'</small><strong>'+esc(value)+'</strong></span></div>').join('');dialog.querySelector('.simulation-input').innerHTML=cards(scene.input,'simulation-document');dialog.querySelector('.simulation-output').innerHTML=cards(scene.output,'simulation-result');}
 function setStep(i){step=(i+4)%4;const p=cases[current];dialog.querySelectorAll('.journey-step').forEach((b,j)=>{b.classList.toggle('active',j===step);b.setAttribute('aria-pressed',String(j===step));});dialog.querySelector('.stage-title').textContent=p.stages[step];dialog.querySelector('.stage-caption').textContent=p.details[step];dialog.querySelector('.stage-count').textContent=String(step+1).padStart(2,'0')+' / 04';dialog.querySelector('.core-symbol').innerHTML=p.icons[step];dialog.querySelector('.simulation').dataset.stage=step;renderScene(p);}
 function openProject(index,trigger){current=index;opener=trigger;step=0;paused=reduced.matches;const p=cases[current];dialog.querySelector('#project-title').textContent=p.name;dialog.querySelector('.project-brief').innerHTML=[['The problem',p.problem],['My role',p.role],['Vision',p.vision],['Key KPIs',p.kpis],['Product scope',p.outcome]].map(([label,copy])=>'<div><h3>'+label+'</h3><p>'+esc(copy)+'</p></div>').join('');dialog.querySelector('.journey-track').innerHTML=p.stages.map((name,i)=>'<button type="button" class="journey-step" data-step="'+i+'" aria-pressed="false"><span class="journey-num">0'+(i+1)+'</span><span>'+esc(name)+'</span></button>').join('');dialog.querySelector('.simulation-input').innerHTML=p.input.map((v,i)=>'<div class="simulation-document"><span class="document-glyph" aria-hidden="true">'+(i?'≡':'▤')+'</span><span>'+esc(v)+'</span><i aria-hidden="true"></i></div>').join('');dialog.querySelector('.simulation-output').innerHTML=p.output.map(v=>'<div class="simulation-result"><span aria-hidden="true">✓</span>'+esc(v)+'</div>').join('');dialog.showModal();document.body.classList.add('project-modal-open');setStep(0);schedule();dialog.querySelector('.player-close').focus();}
 document.querySelectorAll('.project-launch').forEach(b=>b.addEventListener('click',()=>openProject(Number(b.dataset.project),b)));
 dialog.querySelector('.player-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();const b=e.target.closest('[data-step]');if(b){paused=true;setStep(Number(b.dataset.step));schedule();}});
 dialog.querySelector('.player-prev').addEventListener('click',()=>{paused=true;setStep(step-1);schedule();});
 dialog.querySelector('.player-next').addEventListener('click',()=>{paused=true;setStep(step+1);schedule();});
 dialog.querySelector('.player-pause').addEventListener('click',()=>{if(reduced.matches){setStep(step+1);paused=true;}else paused=!paused;schedule();});
 dialog.addEventListener('close',()=>{stop();document.body.classList.remove('project-modal-open');opener?.focus();});
 reduced.addEventListener('change',()=>{paused=reduced.matches;schedule();});document.addEventListener('visibilitychange',schedule);
})();
