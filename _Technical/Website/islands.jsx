import React, {useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import PatternWaves from './components/PatternWaves';
import SpecularButton from './components/SpecularButton';
const motion=matchMedia('(prefers-reduced-motion: reduce)');
let paused=motion.matches;
const listeners=new Set();
function applyMotion(value){paused=value;document.body.classList.toggle('motion-paused',value);const button=document.getElementById('motion-toggle');button.textContent=value?'Enable motion':'Pause motion';button.setAttribute('aria-pressed',String(value));listeners.forEach(f=>f(value));document.dispatchEvent(new CustomEvent('portfolio-motion',{detail:value}));}
function useMotion(){const [value,setValue]=useState(paused);useEffect(()=>{listeners.add(setValue);return()=>listeners.delete(setValue)},[]);return value;}
function Waves(){const stop=useMotion();return <PatternWaves preset="silk" color="#ffffff" backgroundColor="#000000" fade="edges" interactive={!stop} cursorSize={50} cursorStrength={0.6} paused={stop} intro={!stop}/>;}
function Action({label,href}){const stop=useMotion();return <SpecularButton size="lg" radius={18} tint="#ffffff" tintOpacity={0.04} textColor="#f5f5f5" lineColor="#ffffff" baseColor="#525252" intensity={1} idleIntensity={0.35} shineSize={10} shineFade={34} thickness={1.2} glow={1} followMouse={!stop} proximity={250} onClick={()=>{if(href.startsWith('#'))document.querySelector(href)?.scrollIntoView({behavior:stop?'auto':'smooth'});else location.href=href;}}>{label}</SpecularButton>;}
const testCanvas=document.createElement('canvas');
const context=testCanvas.getContext('webgl2');
if(context){context.getExtension('WEBGL_lose_context')?.loseContext();createRoot(document.getElementById('pattern-waves-root')).render(<Waves/>);}
for(const element of document.querySelectorAll('.specular-mount')){const label=element.textContent;createRoot(element).render(<Action label={label} href={element.dataset.href}/>);}
document.getElementById('motion-toggle').addEventListener('click',()=>applyMotion(!paused));
motion.addEventListener('change',e=>applyMotion(e.matches));
document.addEventListener('visibilitychange',()=>listeners.forEach(f=>f(paused||document.hidden)));
applyMotion(paused);
