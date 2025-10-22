// App Forms + Modals + Pricing + Validation
(function(){
    const $ = (s, c=document)=>c.querySelector(s);
    const $$ = (s, c=document)=>Array.from(c.querySelectorAll(s));
    // Delegated modal opener for any [data-open-modal]
    function openModalById(id){
    const modal = document.getElementById(id);
    if(!modal) return;
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', () => close(modal)));
    modal.addEventListener('click', (e)=>{ if(e.target.classList.contains('modal-backdrop')) close(modal); });
    document.addEventListener('keydown', esc);
    function esc(e){ if(e.key==='Escape'){ close(modal); document.removeEventListener('keydown', esc);} }
    function close(m){
    m.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
    
    // remove hash so :target rule no longer forces display
    if (location.hash === '#' + m.id) {
    if (history.replaceState) {
    history.replaceState(null, '', location.pathname + location.search);
    } else {
    location.hash = '';
    }
    }
    }
    }
    window.openModalById = openModalById;
    document.addEventListener('click', (e)=>{
    const trigger = e.target.closest('[data-open-modal]');
    if(!trigger) return;
    e.preventDefault();
    const id = trigger.getAttribute('data-open-modal');
    openModalById(id);
    });
    // -------- Tabs with animated filtering --------
    const tabContainer = $('.menu-tabs');
    const tabBtns = $$('.menu-tabs .tab-btn');
    const tabContents = $$('.menu .tab-content');
    function showTab(key){
    // toggle active
    tabBtns.forEach(b=> b.classList.toggle('active', b.getAttribute('data-tab')===key));
    tabContents.forEach(c=> c.classList.toggle('active', c.id === `${key}-tab`));
    // animate items
    const grid = $(`#${key}-tab .menu-grid`);
    if (grid){
    const items = $$('.menu-item', grid);
    items.forEach((item,i)=>{
    item.style.opacity='0';
    item.style.transform='translateY(24px) scale(.98)';
    setTimeout(()=>{
    item.style.transition='opacity .45s ease, transform .45s ease';
    item.style.opacity='1';
    item.style.transform='translateY(0) scale(1)';
    }, 80*i);
    });
    }
    moveIndicator();
    }
    // indicator element
    function ensureIndicator(){
    if (!$('.menu-tabs .tab-indicator')){
    const ind = document.createElement('div');
    ind.className = 'tab-indicator';
    tabContainer.appendChild(ind);
    }
    }
    function moveIndicator(){
    ensureIndicator();
    const active = $('.menu-tabs .tab-btn.active');
    const ind = $('.menu-tabs .tab-indicator');
    if (active && ind){
    const r = active.getBoundingClientRect();
    const pr = tabContainer.getBoundingClientRect();
    ind.style.left = (r.left - pr.left)+'px';
    ind.style.width = r.width+'px';
    }
    }
    window.addEventListener('resize', moveIndicator);
    
    // init tabs
    if (tabBtns.length){
    tabBtns.forEach(btn=> btn.addEventListener('click', ()=> showTab(btn.getAttribute('data-tab'))));
    // ensure default
    const initial = $('.menu-tabs .tab-btn.active')?.getAttribute('data-tab') || tabBtns[0].getAttribute('data-tab');
    showTab(initial);
    }
    // Modals
    // The openModalById function now handles modal opening
    // Global close handler for all modals
    document.addEventListener('click', (e)=>{
    const closeBtn = e.target.closest('[data-close]');
    if(!closeBtn) return;
    e.preventDefault();
    console.log('Close button clicked:', closeBtn);
    const modal = closeBtn.closest('.modal');
    if(modal){
    console.log('Closing modal:', modal.id);
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    // remove hash so :target rule no longer forces display
    if (location.hash === '#' + modal.id) {
    if (history.replaceState) {
    history.replaceState(null, '', location.pathname + location.search);
    } else {
    location.hash = '';
    }
    }
    }
    });
    // ----- ORDER FORM LOGIC -----
    const orderForm = $('#order-form');
    console.log('Order form found:', orderForm);
    if (orderForm){
    
    const priceBase = { latte: 180, cappuccino: 160, espresso: 140, mocha: 190, americano: 150, macchiato: 170, 'flat-white': 200, 'cold-
    brew': 220 };
    
    const sizeMult = { small: 1.0, medium: 1.25, large: 1.5 };
    const addonCost = { 'extra-shot': 30, 'whipped-cream': 20, 'almond-milk': 25, 'oat-milk': 25, 'vanilla-syrup': 20, 'caramel-syrup': 20 };
    const nameEl = $('#customerName');
    const contactEl = $('#contactInfo');
    const coffeeEl = $('#coffeeSelection');
    const qtyEl = $('#quantity');
    const notesEl = $('#specialInstructions');
    const summaryText = $('#orderSummary .summary-content p');
    const totalEl = $('#totalPrice');
    const saveFavBtn = $('#saveFavorite');
    function calcTotal(){
    const coffee = coffeeEl.value || 'latte';
    const base = priceBase[coffee] || 0;
    const size = $('input[name="size"]:checked', orderForm)?.value || 'small';
    const mult = sizeMult[size] || 1;
    const addons = $$('.addons-grid input:checked').map(cb=>cb.value);
    const addonsSum = addons.reduce((s,a)=> s + (addonCost[a]||0), 0);
    const qty = Math.max(1, parseInt(qtyEl.value || '1', 10));
        const subtotal = (base * mult + addonsSum) * qty;
        // Animate price when it changes
        const newText = `₱${subtotal.toFixed(2)}`;
        if (totalEl.textContent !== newText){
            totalEl.textContent = newText;
            totalEl.classList.remove('price-animate');
            void totalEl.offsetWidth; // reflow to restart animation
            totalEl.classList.add('price-animate');
        } else {
            totalEl.textContent = newText;
        }
    const addTxt = addons.length ? ` + ${addons.join(', ')}` : '';
    const coffeeName = coffee.charAt(0).toUpperCase() + coffee.slice(1).replace('-', ' ');
    const sizeName = size.charAt(0).toUpperCase() + size.slice(1);
    
    summaryText.textContent = `${qty}x ${sizeName} ${coffeeName}${addTxt}${notesEl.value? ' — '+notesEl.value:''}`;
    return subtotal;
    }
    // Live updates
    ['change','input'].forEach(evt => {
    orderForm.addEventListener(evt, (e)=>{
    if (e.target && e.target.id === 'fbMessage') return;
    calcTotal();
    });
    });
    calcTotal();
    // Validation helpers
    function setError(id, msg){
    const el = document.getElementById(id);
    if(el) el.textContent = msg || '';
    }
    function validEmail(str){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str); }
    function validPhone(str){ return /^\+?[0-9\-\s]{7,15}$/.test(str); }
    // Professional Submit Order Animation System
    const submitBtn = $('#submitOrderBtn');
    console.log('Submit button element:', submitBtn);
    console.log('Submit button classes:', submitBtn?.classList?.toString());
    // Professional Submit Order Animation Sequence
    async function submitOrderAnimation() {
    return new Promise((resolve) => {
    console.log('=== SUBMIT ANIMATION STARTED ===');
    console.log('Submit button element:', submitBtn);
    console.log('Submit button classes before animation:', submitBtn.classList.toString());
    const statusEl = $('#orderStatus');
    console.log('Status element found:', statusEl);
    // Step 1: Show loading state
    submitBtn.classList.add('submitting');
    console.log('✅ Added submitting class. Button classes now:', submitBtn.classList.toString());
    if (statusEl) {
    statusEl.textContent = 'Processing your order...';
    statusEl.className = 'order-status processing show';
    console.log('✅ Status element updated with processing message');
    } else {
    console.log('❌ Status element not found');
    }
    // Simulate processing time (1.5 seconds)
    setTimeout(() => {
    console.log('🔄 Switching to success state...');
    // Step 2: Show success state with "Order sent" message
    submitBtn.classList.remove('submitting');
    submitBtn.classList.add('success');
    console.log('✅ Added success class. Button classes now:', submitBtn.classList.toString());
    if (statusEl) {
    statusEl.textContent = 'Order sent successfully! ✓';
    statusEl.className = 'order-status success show';
    console.log('✅ Status element updated with success message');
    }
    // Step 3: Hold success state for 1.5 seconds to show "Order sent" message
    setTimeout(() => {
    
    console.log('🔄 Resetting button state...');
    // Step 4: Reset button state
    submitBtn.classList.remove('success');
    if (statusEl) {
    statusEl.classList.remove('show');
    }
    console.log('✅ Final button classes:', submitBtn.classList.toString());
    // Resolve the promise to continue
    console.log('✅ Resolving promise - animation complete');
    resolve();
    }, 1500);
    }, 1500);
    });
    }
    orderForm.addEventListener('submit', async function(e){
    console.log('=== FORM SUBMISSION STARTED ===');
    console.log('Form element:', orderForm);
    console.log('Event:', e);
    console.log('Event defaultPrevented:', e.defaultPrevented);
    console.log('Form data:', new FormData(orderForm));
    // CRITICAL: Prevent default form submission
    e.preventDefault();
    e.stopPropagation();
    // Double-check prevention
    if (e.defaultPrevented) {
    console.log('✅ Default form submission prevented');
    } else {
    console.log('❌ WARNING: Default form submission not prevented!');
    }
    // Validate form
    let ok = true;
    if(!nameEl.value.trim()){ setError('nameError','Required.'); ok = false; } else setError('nameError');
    const contact = contactEl.value.trim();
    if(!contact){ setError('contactError','Required.'); ok = false; }
    else if(!(validEmail(contact) || validPhone(contact))){ setError('contactError','Enter valid email or phone.'); ok = false; } else
    setError('contactError');
    if(!coffeeEl.value){ setError('coffeeSelectionError','Please select coffee.'); ok = false; } else setError('coffeeSelectionError');
    if(parseInt(qtyEl.value||'0',10) < 1){ setError('quantityError','Minimum 1.'); ok = false; } else setError('quantityError');
    if(!ok) {
    console.log('Form validation failed');
    return;
    }
    console.log('✅ Form validation passed, starting submission...');
    // Disable form submission to prevent double-clicks
    const submitBtn = $('#submitOrderBtn');
    submitBtn.disabled = true;
    console.log('Submit button disabled');
    try {
    // Show immediate feedback
    console.log('🔄 Showing toast notification...');
    showToast('Processing your order...', 'info');
    // Prepare order data
    const orderData = {
    customer_name: nameEl.value.trim(),
    
    contact_info: contact,
    coffee_selection: coffeeEl.value,
    coffee_size: $('input[name="size"]:checked', orderForm)?.value || 'small',
    quantity: parseInt(qtyEl.value || '1', 10),
    special_instructions: notesEl.value.trim(),
    addons: $$('.addons-grid input:checked').map(cb => cb.value)
    };
    console.log('📦 Order data prepared:', orderData);
    // Start submit animation sequence
    console.log('🎬 Starting submit order animation...');
    await submitOrderAnimation();
    console.log('✅ Submit animation completed');
    // Send order to backend
    console.log('🚀 Sending order to backend...');
    console.log('📦 Order data being sent:', orderData);
    const response = await fetch('submit_order.php', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData)
    });
    console.log('📡 Response status:', response.status);
    console.log('📡 Response headers:', response.headers);
    if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log('📨 Backend response:', result);
    if (result.success) {
    // Show success message
    console.log('🎉 Order submitted successfully!');
    showToast(`Order submitted successfully! Order ID: ${result.order_id}`, 'success');
    // Close the order modal first
    console.log('🚪 Closing order modal...');
    const orderModal = document.getElementById('order-modal');
    if (orderModal) {
    orderModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    console.log('✅ Order modal closed');
    }
    // Show success animation modal
    console.log('🌟 Showing success animation modal...');
    showSuccessAnimation();
    console.log('✅ Success animation modal should now be visible');
    // Reset form
    orderForm.reset();
    calcTotal();
    $$('.addons-grid input').forEach(cb=> cb.checked=false);
    console.log('✅ Form reset completed');
    } else {
    throw new Error(result.message || 'Failed to submit order');
    }
    
    } catch (error) {
    console.error('❌ Error during order submission:', error);
    showToast(`Error: ${error.message}`, 'error');
    // Reset button state on error
    submitBtn.classList.remove('submitting', 'success');
    const statusEl = $('#orderStatus');
    if (statusEl) {
    statusEl.classList.remove('show');
    }
    } finally {
    // Re-enable button
    submitBtn.disabled = false;
    console.log('✅ Submit button re-enabled');
    }
    console.log('=== FORM SUBMISSION COMPLETED ===');
    // Prevent any further form submission
    return false;
    });
    // Also add a direct click listener for testing
    if (submitBtn) {
    submitBtn.addEventListener('click', function(e) {
    console.log('🔴 SUBMIT BUTTON CLICKED!');
    console.log('Button disabled?', submitBtn.disabled);
    console.log('Button form:', submitBtn.form);
    console.log('Form element:', orderForm);
    // CRITICAL: Prevent default button behavior
    e.preventDefault();
    e.stopPropagation();
    // If button is disabled, don't proceed
    if (submitBtn.disabled) {
    console.log('Button is disabled, not proceeding');
    return false;
    }
    // If form exists, manually trigger our submission logic
    if (orderForm) {
    console.log('Manually triggering form submission...');
    // Create a submit event and dispatch it
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
    orderForm.dispatchEvent(submitEvent);
    } else {
    console.log('No form found!');
    }
    });
    }
    // Save favorite order
    if (saveFavBtn){
    saveFavBtn.addEventListener('click', ()=>{
    const data = {
    name: nameEl.value.trim(),
    contact: contactEl.value.trim(),
    coffee: coffeeEl.value,
    size: $('input[name="size"]:checked', orderForm)?.value,
    addons: $$('.addons-grid input:checked').map(cb=>cb.value),
    qty: qtyEl.value,
    notes: notesEl.value
    };
    localStorage.setItem('favoriteOrder', JSON.stringify(data));
    
    alert('Favorite order saved!');
    });
    }
    // If favorite exists, prefill on open
    document.getElementById('order-modal')?.addEventListener('click', ()=>{
    const fav = localStorage.getItem('favoriteOrder');
    if (fav){
    try{
    const d = JSON.parse(fav);
    nameEl.value = d.name||'';
    contactEl.value = d.contact||'';
    coffeeEl.value = d.coffee||'';
    const sizeRadio = $$('input[name="size"]', orderForm).find(r=> r.value===d.size);
    if(sizeRadio) sizeRadio.checked = true;
    $$('.addons-grid input').forEach(cb=> cb.checked = (d.addons||[]).includes(cb.value));
    qtyEl.value = d.qty||1;
    notesEl.value = d.notes||'';
    calcTotal();
    }catch{}
    }
    }, { once: true });
    }
    // ----- RESERVATION FORM -----
    const resForm = $('#reservation-form');
    if (resForm){
    const nameEl = $('#resName');
    const contactEl = $('#resContact');
    const dateEl = $('#resDate');
    const timeEl = $('#resTime');
    const guestsEl = $('#resGuests');
    const MAX_GUESTS = 12;
    function setError(id, msg){ const el = $(`[data-error-for="${id}"]`); if(el) el.textContent = msg || ''; }
    function validPhone(str){ return /^\+?[0-9\-\s]{7,15}$/.test(str); }
    function isFutureDateTime(dateStr, timeStr){
    const dt = new Date(`${dateStr}T${timeStr}`);
    return dt.getTime() > Date.now();
    }
    resForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    let ok = true;
    if(!nameEl.value.trim()){ setError('resName','Required.'); ok=false; } else setError('resName');
    if(!validPhone(contactEl.value.trim())){ setError('resContact','Enter valid phone.'); ok=false; } else setError('resContact');
    if(!dateEl.value){ setError('resDate','Select date.'); ok=false; } else setError('resDate');
    if(!timeEl.value){ setError('resTime','Select time.'); ok=false; } else setError('resTime');
    if(!(dateEl.value && timeEl.value && isFutureDateTime(dateEl.value, timeEl.value))){ setError('resTime','Pick a future time.');
    ok=false; }
    const guests = parseInt(guestsEl.value||'0',10);
    if(guests<1 || guests>MAX_GUESTS){ setError('resGuests',`1 - ${MAX_GUESTS} only.`); ok=false; } else setError('resGuests');
    if(!ok) return;
    if(confirm('Confirm this reservation?')){
    alert('Reservation confirmed! See you soon.');
    resForm.reset();
    }
    });
    }
    // ----- FEEDBACK FORM -----
    const fbForm = $('#feedback-form');
    if (fbForm){
    const nameEl = $('#fbName');
    const emailEl = $('#fbEmail');
    const typeEl = $('#fbType');
    
    const msgEl = $('#fbMessage');
    const countEl = $('#fbCount');
    const MAX = 300;
    function setError(id, msg){ const el = $(`[data-error-for="${id}"]`); if(el) el.textContent = msg || ''; }
    function validEmail(str){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str); }
    msgEl.addEventListener('input', ()=>{ countEl.textContent = String(msgEl.value.length); });
    fbForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    let ok = true;
    if(!nameEl.value.trim()){ setError('fbName','Required.'); ok=false; } else setError('fbName');
    if(!validEmail(emailEl.value.trim())){ setError('fbEmail','Enter valid email.'); ok=false; } else setError('fbEmail');
    if(!typeEl.value){ setError('fbType','Select type.'); ok=false; } else setError('fbType');
    if(!msgEl.value.trim()){ setError('fbMessage','Required.'); ok=false; } else if(msgEl.value.length>MAX){ setError('fbMessage','Max 300
    chars.'); ok=false; } else setError('fbMessage');
    if(!ok) return;
    alert('Thank you for your feedback!');
    fbForm.reset();
    countEl.textContent = '0';
    });
    }
    // ----- LOYALTY FORM -----
    const loyForm = $('#loyalty-form');
    if (loyForm){
    const nameEl = $('#loyName');
    const emailEl = $('#loyEmail');
    const bdayEl = $('#loyBirthday');
    const perkEl = $('#birthdayPerk');
    function setError(id, msg){ const el = $(`[data-error-for="${id}"]`); if(el) el.textContent = msg || ''; }
    function validEmail(str){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str); }
    bdayEl.addEventListener('change', ()=>{
    const val = bdayEl.value;
    if(!val){ perkEl.textContent = 'Enter your birthday to see your perk 🎉'; return; }
    const d = new Date(val);
    perkEl.textContent = `Perk unlocked: ₱50 off on your ${d.toLocaleString('en-US',{ month:'long', day:'numeric'})} birthday! 🎉`;
    });
    loyForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    let ok = true;
    if(!nameEl.value.trim()){ setError('loyName','Required.'); ok=false; } else setError('loyName');
    if(!validEmail(emailEl.value.trim())){ setError('loyEmail','Enter valid email.'); ok=false; } else setError('loyEmail');
    if(!bdayEl.value){ setError('loyBirthday','Select birthday.'); ok=false; } else setError('loyBirthday');
    if(!ok) return;
    alert('Welcome to our Loyalty Program!');
    loyForm.reset();
    perkEl.textContent = 'Enter your birthday to see your perk 🎉';
    });
    }
    })();
    document.addEventListener('DOMContentLoaded', function(){
    var btn = document.querySelector('.nav-order');
    if (btn) {
    btn.addEventListener('click', function(e){
    e.preventDefault();
    if (window.openModalById) {
    window.openModalById('order-modal');
    } else {
    var modal = document.getElementById('order-modal');
    
    if (modal){ modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
    }
    });
    }
    });
    // Order modal controls: close button, cancel, and success animation
    (function(){
    const modal = document.getElementById('order-modal');
    const successAnimation = document.getElementById('successAnimation');
    if (!modal) return;
    function clearHashIfTarget(){
    if (location.hash === '#order-modal'){
    if (history.replaceState){ history.replaceState(null,'',location.pathname + location.search); }
    else { location.hash = ''; }
    }
    }
    function closeModal(){
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
    clearHashIfTarget();
    // Return to dashboard view
    document.body.classList.remove('modal-open');
    }
    function showSuccessAnimation(){
    console.log('=== SHOW SUCCESS ANIMATION STARTED ===');
    console.log('Success animation element:', successAnimation);
    console.log('Current classes:', successAnimation.classList.toString());
    if (!successAnimation) {
    console.error('❌ Success animation element not found!');
    return;
    }
    successAnimation.classList.add('show');
    console.log('✅ Added show class. New classes:', successAnimation.classList.toString());
    document.body.style.overflow = 'hidden';
    console.log('✅ Body overflow set to hidden');
    // Force a reflow to ensure the animation is visible
    successAnimation.offsetHeight;
    console.log('✅ Forced reflow');
    // Auto-close after 8 seconds
    setTimeout(() => {
    console.log('🕐 Auto-closing success animation...');
    closeSuccessAnimation();
    }, 8000);
    console.log('✅ Success animation should now be visible');
    console.log('=== SHOW SUCCESS ANIMATION COMPLETED ===');
    }
    function closeSuccessAnimation(){
    successAnimation.classList.remove('show');
    document.body.style.overflow = '';
    // Return to dashboard view
    document.body.classList.remove('modal-open');
    }
    // Make closeSuccessAnimation globally available
    
    window.closeSuccessAnimation = closeSuccessAnimation;
    // Make showSuccessAnimation globally available
    window.showSuccessAnimation = showSuccessAnimation;
    // Toast notification system
    function showToast(message, type = 'info') {
    // Create toast element if it doesn't exist
    let toast = document.getElementById('toast');
    if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
    }
    // Set toast content and type
    toast.textContent = message;
    toast.className = `toast toast-${type}`;
    // Show toast
    toast.classList.add('show');
    // Auto-hide after 3 seconds
    setTimeout(() => {
    toast.classList.remove('show');
    }, 3000);
    }
    // Make showToast globally available
    window.showToast = showToast;
    // Close buttons are now handled by the global data-close handler
    // No need for individual event listeners here
    // Close success animation on backdrop click
    successAnimation.addEventListener('click', function(e) {
    if (e.target === successAnimation) {
    closeSuccessAnimation();
    }
    });
    // Close success animation on Escape key
    document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && successAnimation.classList.contains('show')) {
    closeSuccessAnimation();
    }
    });
    })();
    // Professional Feedback Form Functionality
    (function() {
    const feedbackForm = document.getElementById('feedback-contact-form');
    if (feedbackForm) {
    const feedbackName = document.getElementById('feedbackName');
    const feedbackEmail = document.getElementById('feedbackEmail');
    const feedbackType = document.getElementById('feedbackType');
    const feedbackMessage = document.getElementById('feedbackMessage');
    const feedbackWordCount = document.getElementById('feedbackWordCount');
    const feedbackCharCount = document.getElementById('feedbackCharCount');
    const feedbackSubmitBtn = document.querySelector('.feedback-submit');
    // Word and character counter
    function updateCounters() {
    
    const text = feedbackMessage.value;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    feedbackWordCount.textContent = words;
    feedbackCharCount.textContent = chars;
    // Change color when approaching limit
    if (chars > 450) {
    feedbackCharCount.style.color = '#dc3545';
    } else if (chars > 400) {
    feedbackCharCount.style.color = '#ffc107';
    } else {
    feedbackCharCount.style.color = '#D2691E';
    }
    }
    // Error handling
    function showFeedbackError(elementId, message) {
    const errorEl = document.getElementById(elementId);
    if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add('show');
    }
    }
    function clearFeedbackError(elementId) {
    const errorEl = document.getElementById(elementId);
    if (errorEl) {
    errorEl.textContent = '';
    errorEl.classList.remove('show');
    }
    }
    // Form validation
    function validateFeedbackForm() {
    let isValid = true;
    // Name validation
    if (!feedbackName.value.trim()) {
    showFeedbackError('feedbackNameError', 'Please enter your name');
    isValid = false;
    } else {
    clearFeedbackError('feedbackNameError');
    }
    // Email validation
    const email = feedbackEmail.value.trim();
    if (!email) {
    showFeedbackError('feedbackEmailError', 'Please enter your email');
    isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showFeedbackError('feedbackEmailError', 'Please enter a valid email address');
    isValid = false;
    } else {
    clearFeedbackError('feedbackEmailError');
    }
    // Feedback type validation
    if (!feedbackType.value) {
    showFeedbackError('feedbackTypeError', 'Please select a feedback type');
    isValid = false;
    } else {
    clearFeedbackError('feedbackTypeError');
    }
    
    // Message validation
    if (!feedbackMessage.value.trim()) {
    showFeedbackError('feedbackMessageError', 'Please enter your message');
    isValid = false;
    } else if (feedbackMessage.value.trim().length < 10) {
    showFeedbackError('feedbackMessageError', 'Message must be at least 10 characters long');
    isValid = false;
    } else {
    clearFeedbackError('feedbackMessageError');
    }
    return isValid;
    }
    // Submit animation
    async function submitFeedbackAnimation() {
    return new Promise((resolve) => {
    console.log('Starting feedback submit animation...');
    // Step 1: Show loading state
    feedbackSubmitBtn.classList.add('submitting');
    // Simulate processing time (2 seconds)
    setTimeout(() => {
    console.log('Switching to success state...');
    // Step 2: Show success state
    feedbackSubmitBtn.classList.remove('submitting');
    feedbackSubmitBtn.classList.add('success');
    // Step 3: Hold success state for 1 second
    setTimeout(() => {
    console.log('Resetting button state...');
    // Step 4: Reset button state
    feedbackSubmitBtn.classList.remove('success');
    // Resolve the promise to continue
    resolve();
    }, 1000);
    }, 2000);
    });
    }
    // Form submission
    feedbackForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    console.log('Feedback form submitted!');
    if (!validateFeedbackForm()) {
    console.log('Form validation failed');
    return;
    }
    console.log('✅ Feedback form validation passed, starting submission...');
    // Disable form submission
    feedbackSubmitBtn.disabled = true;
    try {
    // Start submit animation
    await submitFeedbackAnimation();
    // Show thank you popup
    showThankYouPopup();
    
    // Reset form
    feedbackForm.reset();
    updateCounters();
    // Close feedback modal
    const feedbackModal = document.getElementById('feedback-contact-modal');
    if (feedbackModal) {
    feedbackModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    }
    } catch (error) {
    console.error('Error during feedback submission:', error);
    showToast('There was an error submitting your feedback. Please try again.', 'error');
    } finally {
    // Re-enable button
    feedbackSubmitBtn.disabled = false;
    }
    });
    // Live counter updates
    feedbackMessage.addEventListener('input', updateCounters);
    // Initialize counters
    updateCounters();
    }
    // Thank you popup functions
    function showThankYouPopup() {
    const popup = document.getElementById('thankYouPopup');
    if (popup) {
    popup.classList.add('show');
    document.body.style.overflow = 'hidden';
    }
    }
    function closeThankYouPopup() {
    const popup = document.getElementById('thankYouPopup');
    if (popup) {
    popup.classList.remove('show');
    document.body.style.overflow = '';
    }
    }
    // Make functions globally available
    window.showThankYouPopup = showThankYouPopup;
    window.closeThankYouPopup = closeThankYouPopup;
    })();
    // Professional Reservation Form Functionality
    (function() {
    const reservationForm = document.getElementById('reservation-contact-form');
    if (reservationForm) {
    const reservationName = document.getElementById('reservationName');
    const reservationContact = document.getElementById('reservationContact');
    const reservationDate = document.getElementById('reservationDate');
    const reservationTime = document.getElementById('reservationTime');
    const reservationGuests = document.getElementById('reservationGuests');
    const reservationNotes = document.getElementById('reservationNotes');
    const reservationWordCount = document.getElementById('reservationWordCount');
    const reservationCharCount = document.getElementById('reservationCharCount');
    const reservationSubmitBtn = document.querySelector('.reservation-submit');
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    
    reservationDate.setAttribute('min', today);
    // Word and character counter for notes
    function updateReservationCounters() {
    const text = reservationNotes.value;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    reservationWordCount.textContent = words;
    reservationCharCount.textContent = chars;
    // Change color when approaching limit
    if (chars > 180) {
    reservationCharCount.style.color = '#dc3545';
    } else if (chars > 150) {
    reservationCharCount.style.color = '#ffc107';
    } else {
    reservationCharCount.style.color = '#2E8B57';
    }
    }
    // Error handling
    function showReservationError(elementId, message) {
    const errorEl = document.getElementById(elementId);
    if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add('show');
    }
    }
    function clearReservationError(elementId) {
    const errorEl = document.getElementById(elementId);
    if (errorEl) {
    errorEl.textContent = '';
    errorEl.classList.remove('show');
    }
    }
    // Validation functions
    function isValidPhone(str) {
    return /^\+?[0-9\-\s]{7,15}$/.test(str);
    }
    function isFutureDateTime(dateStr, timeStr) {
    const selectedDateTime = new Date(`${dateStr}T${timeStr}`);
    const now = new Date();
    return selectedDateTime.getTime() > now.getTime();
    }
    function isValidTime(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours >= 6 && hours <= 22; // Business hours: 6 AM to 10 PM
    }
    // Form validation
    function validateReservationForm() {
    let isValid = true;
    // Name validation
    if (!reservationName.value.trim()) {
    showReservationError('reservationNameError', 'Please enter your name');
    isValid = false;
    } else {
    clearReservationError('reservationNameError');
    }
    
    // Contact validation
    const contact = reservationContact.value.trim();
    if (!contact) {
    showReservationError('reservationContactError', 'Please enter your contact number');
    isValid = false;
    } else if (!isValidPhone(contact)) {
    showReservationError('reservationContactError', 'Please enter a valid contact number');
    isValid = false;
    } else {
    clearReservationError('reservationContactError');
    }
    // Date validation
    if (!reservationDate.value) {
    showReservationError('reservationDateError', 'Please select a date');
    isValid = false;
    } else {
    clearReservationError('reservationDateError');
    }
    // Time validation
    if (!reservationTime.value) {
    showReservationError('reservationTimeError', 'Please select a time');
    isValid = false;
    } else if (!isValidTime(reservationTime.value)) {
    showReservationError('reservationTimeError', 'Please select a time between 6:00 AM and 10:00 PM');
    isValid = false;
    } else {
    clearReservationError('reservationTimeError');
    }
    // Date and time combination validation
    if (reservationDate.value && reservationTime.value) {
    if (!isFutureDateTime(reservationDate.value, reservationTime.value)) {
    showReservationError('reservationTimeError', 'Please select a future date and time');
    isValid = false;
    } else {
    clearReservationError('reservationTimeError');
    }
    }
    // Guests validation
    if (!reservationGuests.value) {
    showReservationError('reservationGuestsError', 'Please select number of guests');
    isValid = false;
    } else if (parseInt(reservationGuests.value) > 10) {
    showReservationError('reservationGuestsError', 'Maximum 10 guests per reservation');
    isValid = false;
    } else {
    clearReservationError('reservationGuestsError');
    }
    return isValid;
    }
    // Submit animation
    async function submitReservationAnimation() {
    return new Promise((resolve) => {
    console.log('Starting reservation submit animation...');
    // Step 1: Show loading state
    reservationSubmitBtn.classList.add('submitting');
    // Simulate processing time (2 seconds)
    setTimeout(() => {
    console.log('Switching to success state...');
    
    // Step 2: Show success state
    reservationSubmitBtn.classList.remove('submitting');
    reservationSubmitBtn.classList.add('success');
    // Step 3: Hold success state for 1 second
    setTimeout(() => {
    console.log('Resetting button state...');
    // Step 4: Reset button state
    reservationSubmitBtn.classList.remove('success');
    // Resolve the promise to continue
    resolve();
    }, 1000);
    }, 2000);
    });
    }
    // Show confirmation popup
    function showReservationConfirmation(reservationData) {
    const popup = document.getElementById('reservationConfirmationPopup');
    const detailsContainer = document.getElementById('reservationDetails');
    if (popup && detailsContainer) {
    // Format date and time
    const date = new Date(`${reservationData.date}T${reservationData.time}`);
    const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
    });
    const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
    });
    // Populate reservation details
    detailsContainer.innerHTML = `
    <h4>Reservation Details</h4>
    <p><strong>Name:</strong> ${reservationData.name}</p>
    <p><strong>Contact:</strong> ${reservationData.contact}</p>
    <p><strong>Date:</strong> ${formattedDate}</p>
    <p><strong>Time:</strong> ${formattedTime}</p>
    <p><strong>Guests:</strong> ${reservationData.guests} ${parseInt(reservationData.guests) === 1 ? 'Guest' : 'Guests'}</p>
    ${reservationData.notes ? `<p><strong>Special Requests:</strong> ${reservationData.notes}</p>` : ''}
    `;
    popup.classList.add('show');
    document.body.style.overflow = 'hidden';
    }
    }
    // Form submission
    reservationForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    console.log('Reservation form submitted!');
    if (!validateReservationForm()) {
    console.log('Form validation failed');
    return;
    }
    
    console.log('✅ Reservation form validation passed, starting submission...');
    // Disable form submission
    reservationSubmitBtn.disabled = true;
    try {
    // Start submit animation
    await submitReservationAnimation();
    // Prepare reservation data
    const reservationData = {
    name: reservationName.value.trim(),
    contact: reservationContact.value.trim(),
    date: reservationDate.value,
    time: reservationTime.value,
    guests: reservationGuests.value,
    notes: reservationNotes.value.trim()
    };
    // Show confirmation popup
    showReservationConfirmation(reservationData);
    // Reset form
    reservationForm.reset();
    updateReservationCounters();
    // Close reservation modal
    const reservationModal = document.getElementById('reservation-contact-modal');
    if (reservationModal) {
    reservationModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    }
    } catch (error) {
    console.error('Error during reservation submission:', error);
    showToast('There was an error processing your reservation. Please try again.', 'error');
    } finally {
    // Re-enable button
    reservationSubmitBtn.disabled = false;
    }
    });
    // Live counter updates
    reservationNotes.addEventListener('input', updateReservationCounters);
    // Initialize counters
    updateReservationCounters();
    }
    // Close reservation confirmation popup
    function closeReservationConfirmation() {
    const popup = document.getElementById('reservationConfirmationPopup');
    if (popup) {
    popup.classList.remove('show');
    document.body.style.overflow = '';
    }
    }
    // Make function globally available
    window.closeReservationConfirmation = closeReservationConfirmation;
    })();