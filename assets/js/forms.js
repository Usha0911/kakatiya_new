/* Connect a Formspree or same-origin PHP JSON endpoint here; never add API secrets.
 * The endpoint must validate fields, honeypot, consent and rate limits server-side.
 * It must return a 2xx JSON response with {"ok":true} or {"success":true}.
 * Empty endpoint = explicit email-composer fallback, never a false sent status.
 */
window.KS_FORM_ENDPOINTS = window.KS_FORM_ENDPOINTS || {contact:'',quote:'',newsletter:''};
(() => {
  'use strict';
  const validate=fields=>{let first=null;fields.forEach(field=>{if(!field.willValidate)return;const valid=field.checkValidity();field.setAttribute('aria-invalid',String(!valid));let error=field.parentElement.querySelector('.field__error');if(!valid&&field.type!=='radio'){if(!error){error=document.createElement('p');error.className='field__error';error.id=`error-${field.id||field.name}`;field.parentElement.append(error);field.setAttribute('aria-describedby',error.id);}error.textContent=field.validationMessage;}else if(error){error.remove();field.removeAttribute("aria-describedby");}if(!valid&&!first)first=field;});if(first){first.reportValidity();first.focus();return false;}return true;};
  const wizard=document.querySelector('[data-wizard]');
  let step=0;let showStep=()=>{};
  if(wizard){const requested=new URLSearchParams(location.search).get('service');const selected=window.KS?.services?.find(s=>s[0]===requested);if(selected){const input=[...wizard.querySelectorAll('[name=service]')].find(el=>el.value===selected[1]);if(input)input.checked=true;}const steps=[...wizard.querySelectorAll('.quote-step')],back=wizard.querySelector('[data-back]'),next=wizard.querySelector('[data-next]'),submit=wizard.querySelector('[type=submit]');
    showStep=()=>{steps.forEach((el,i)=>{el.hidden=i!==step;el.disabled=i!==step;});wizard.querySelectorAll('.quote-progress span').forEach((el,i)=>el.classList.toggle('is-active',i<=step));wizard.querySelector('[data-step-count]').textContent=`Step ${step+1} of ${steps.length}`;back.hidden=step===0;next.hidden=step===steps.length-1;submit.hidden=step!==steps.length-1;const review=wizard.querySelector('[data-review]');if(step===steps.length-1){const get=name=>wizard.querySelector(`[name="${name}"]:checked`)?.value||'';review.textContent=`Service: ${get('service')}\nBudget: ${get('budget')}\nTimeline: ${get('timeline')}`;}};
    next.addEventListener('click',()=>{if(validate([...steps[step].querySelectorAll('input,select,textarea')])){step++;showStep();steps[step].querySelector('legend')?.focus();}});
    back.addEventListener('click',()=>{step=Math.max(0,step-1);showStep();steps[step].querySelector('legend')?.focus();});showStep();
    wizard.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.tagName!=='TEXTAREA'&&e.target.tagName!=='BUTTON'&&step<steps.length-1){e.preventDefault();next.click();}});
  }
  document.querySelectorAll('[data-form]').forEach(form=>{form.noValidate=true;form.addEventListener('submit',async e=>{e.preventDefault();if(!validate([...form.querySelectorAll('input,select,textarea')]))return;const status=form.querySelector('.form-status');if(form.querySelector('[name=website]')?.value){status.textContent='Unable to submit this request. Please call or email us.';return;}
    form.querySelectorAll('.quote-step').forEach(el=>el.disabled=false);const data=new FormData(form);if(form===wizard)showStep();const kind=form.dataset.form,endpoint=window.KS_FORM_ENDPOINTS[kind];
    const fallback=(failed=false)=>{const subject=kind==='newsletter'?'Newsletter subscription request':`New ${kind} enquiry — Kakatiya Solutions`;const body=[...data.entries()].filter(([key])=>!['website','consent'].includes(key)).map(([key,value])=>`${key}: ${value}`).join('\n');status.replaceChildren();const message=document.createElement('span');message.textContent=failed?'Online delivery could not be confirmed. Your details are still here. ':'Your request is ready. ';const link=document.createElement('a');link.href=`mailto:info@kakatiyasolutions.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;link.textContent='Open your email app to send it';status.append(message,link,document.createTextNode('. Nothing has been sent by this website. You can also call +91 939 080 7611.'));};
    if(!endpoint){fallback();return;}
    const button=form.querySelector('[type=submit]');button.disabled=true;status.textContent='Sending your request…';const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),15000);
    try{const response=await fetch(endpoint,{method:'POST',body:data,headers:{Accept:'application/json'},signal:controller.signal});if(!response.ok)throw new Error('Delivery failed');const result=await response.json();if(result.ok!==true&&result.success!==true)throw new Error('Unconfirmed response');status.innerHTML='<span class="success-mark">✓ Request sent successfully. Thank you for getting in touch.</span>';form.reset();if(form===wizard){step=0;showStep();}}
    catch(_){fallback(true);}finally{clearTimeout(timeout);button.disabled=false;}
  });});
})();
