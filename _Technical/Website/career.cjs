'use strict';
// Use the resume as the single source for public role descriptions.
function role(article){
 const title=article.match(/<h3>([\s\S]*?)<\/h3>/)?.[1];
 const date=article.match(/class="date">([\s\S]*?)<\/strong>/)?.[1];
 const bullets=[...article.matchAll(/<li>([\s\S]*?)<\/li>/g)].map(m=>m[1]);
 if(!title||!date||!bullets.length)throw Error('Resume role is missing title, dates or bullets');
 return {title,date,bullets};
}
function renderRole(r){return '<details class="career-role"><summary><span class="role-date">'+r.date+'</span><h4>'+r.title+'</h4><span class="disclosure-icon" aria-hidden="true"></span></summary><div class="role-description"><ul>'+r.bullets.map(b=>'<li>'+b+'</li>').join('')+'</ul></div></details>';}
function renderCareer(resume){
 const section=resume.match(/<section><h2>Professional Experience<\/h2>([\s\S]*?)<\/section>/)?.[1];
 if(!section)throw Error('Missing professional experience in resume');
 const companies=section.split('<div class="company">').slice(1).map(part=>{
  const title=part.match(/class="company-name">([\s\S]*?)<\/h3>/)?.[1];
  const roles=[...part.matchAll(/<article class="position">([\s\S]*?)<\/article>/g)].map(m=>role(m[1]));
  if(!title||!roles.length)throw Error('Company has no title or roles');
  const years=roles.flatMap(r=>r.date.match(/\d{4}/g)||[]).map(Number);
  const end=roles.some(r=>/Present/.test(r.date))?'PRESENT':Math.max(...years);
  return '<details class="chapter career-company reveal" open><summary class="company-summary"><span class="date">'+Math.min(...years)+' — '+end+'</span><h3>'+title+'</h3><span class="company-hint">'+roles.length+' '+(roles.length===1?'role':'roles')+'</span><span class="disclosure-icon" aria-hidden="true"></span></summary><div class="company-roles">'+roles.map(renderRole).join('')+'</div></details>';
 });
 if(!companies.length)throw Error('No resume companies found');
 return companies.join('\n');
}
function renderCommunity(resume){
 const section=resume.match(/<section><h2>Community &amp; Volunteering<\/h2>([\s\S]*?)<\/section>/)?.[1];
 if(!section)throw Error('Missing community experience in resume');
 return [...section.matchAll(/<article class="position">([\s\S]*?)<\/article>/g)].map(m=>renderRole(role(m[1]))).join('');
}
function renderEducation(resume){
 const section=resume.match(/<section class="education"><h2>Education<\/h2>([\s\S]*?)<\/section>/)?.[1];
 const training=resume.match(/<section class="education"><h2>Professional Training &amp; Certifications<\/h2>([\s\S]*?)<\/section>/)?.[1];
 if(!section||!training)throw Error('Missing education or training in resume');
 const degree=section.match(/<p><strong>([\s\S]*?)<\/strong>\s*\|\s*([\s\S]*?)\|\s*([^<]+)<\/p>/);
 if(!degree)throw Error('Degree format not recognized');
 const courses=[...training.matchAll(/<p><strong>([\s\S]*?)<\/strong>\s*\|\s*([\s\S]*?)\|\s*([^<]+)<\/p>/g)];
 if(!courses.length)throw Error('No training found');
 return '<div class="education-grid"><article class="degree-card"><span class="education-kind">Economist</span><h3>'+degree[1]+'</h3><p>'+degree[2].trim()+'</p><span class="education-year">'+degree[3].trim()+'</span></article><div class="training-list"><h3>Professional training</h3>'+courses.map(c=>'<article class="training-item"><div><h4>'+c[1]+'</h4><p>'+c[2].trim()+'</p></div><span class="education-year">'+c[3].trim()+'</span></article>').join('')+'</div></div>';
}
module.exports={renderCareer,renderCommunity,renderEducation};
