const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=i.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(s,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new r(i,t,s)},o=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:a,defineProperty:h,getOwnPropertyDescriptor:l,getOwnPropertyNames:c,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,_=globalThis,u=_.trustedTypes,$=u?u.emptyScript:"",g=_.reactiveElementPolyfillSupport,f=(t,e)=>t,m={toAttribute(t,e){switch(e){case Boolean:t=t?$:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},y=(t,e)=>!a(t,e),v={attribute:!0,type:String,converter:m,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&h(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const n=i?.call(this);r?.call(this,e),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??v}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...c(t),...d(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((s,i)=>{if(e)s.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of i){const i=document.createElement("style"),r=t.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=e.cssText,s.appendChild(i)}})(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:m).toAttribute(e,s.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:m;this._$Em=i;const n=r.fromAttribute(e,t.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(void 0!==t){const n=this.constructor;if(!1===i&&(r=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??y)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[f("elementProperties")]=new Map,A[f("finalized")]=new Map,g?.({ReactiveElement:A}),(_.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,b=t=>t,x=w.trustedTypes,E=x?x.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,T=`<${P}>`,U=document,M=()=>U.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,I=Array.isArray,k="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,R=/>/g,D=RegExp(`>|${k}(?:([^\\s"'>=/]+)(${k}*=${k}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,L=/"/g,B=/^(?:script|style|textarea|title)$/i,j=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),W=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),V=new WeakMap,F=U.createTreeWalker(U,129);function K(t,e){if(!I(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const Z=(t,e)=>{const s=t.length-1,i=[];let r,n=2===e?"<svg>":3===e?"<math>":"",o=H;for(let e=0;e<s;e++){const s=t[e];let a,h,l=-1,c=0;for(;c<s.length&&(o.lastIndex=c,h=o.exec(s),null!==h);)c=o.lastIndex,o===H?"!--"===h[1]?o=N:void 0!==h[1]?o=R:void 0!==h[2]?(B.test(h[2])&&(r=RegExp("</"+h[2],"g")),o=D):void 0!==h[3]&&(o=D):o===D?">"===h[0]?(o=r??H,l=-1):void 0===h[1]?l=-2:(l=o.lastIndex-h[2].length,a=h[1],o=void 0===h[3]?D:'"'===h[3]?L:z):o===L||o===z?o=D:o===N||o===R?o=H:(o=D,r=void 0);const d=o===D&&t[e+1].startsWith("/>")?" ":"";n+=o===H?s+T:l>=0?(i.push(a),s.slice(0,l)+S+s.slice(l)+C+d):s+C+(-2===l?e:d)}return[K(t,n+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class J{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,n=0;const o=t.length-1,a=this.parts,[h,l]=Z(t,e);if(this.el=J.createElement(h,s),F.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=F.nextNode())&&a.length<o;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(S)){const e=l[n++],s=i.getAttribute(t).split(C),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:o[2],strings:s,ctor:"."===o[1]?tt:"?"===o[1]?et:"@"===o[1]?st:Q}),i.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:r}),i.removeAttribute(t));if(B.test(i.tagName)){const t=i.textContent.split(C),e=t.length-1;if(e>0){i.textContent=x?x.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],M()),F.nextNode(),a.push({type:2,index:++r});i.append(t[e],M())}}}else if(8===i.nodeType)if(i.data===P)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(C,t+1));)a.push({type:7,index:r}),t+=C.length-1}r++}}static createElement(t,e){const s=U.createElement("template");return s.innerHTML=t,s}}function X(t,e,s=t,i){if(e===W)return e;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const n=O(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(e=X(t,r._$AS(t,e.values),r,i)),e}class Y{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??U).importNode(e,!0);F.currentNode=i;let r=F.nextNode(),n=0,o=0,a=s[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new G(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new it(r,this,t)),this._$AV.push(e),a=s[++o]}n!==a?.index&&(r=F.nextNode(),n++)}return F.currentNode=U,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class G{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),O(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>I(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=J.createElement(K(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Y(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new J(t)),e}k(t){I(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new G(this.O(M()),this.O(M()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=b(t).nextSibling;b(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=q}_$AI(t,e=this,s,i){const r=this.strings;let n=!1;if(void 0===r)t=X(this,t,e,0),n=!O(t)||t!==this._$AH&&t!==W,n&&(this._$AH=t);else{const i=t;let o,a;for(t=r[0],o=0;o<r.length-1;o++)a=X(this,i[s+o],e,o),a===W&&(a=this._$AH[o]),n||=!O(a)||a!==this._$AH[o],a===q?t=q:t!==q&&(t+=(a??"")+r[o+1]),this._$AH[o]=a}n&&!i&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class et extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class st extends Q{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??q)===W)return;const s=this._$AH,i=t===q&&s!==q||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==q&&(s===q||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const rt=w.litHtmlPolyfillSupport;rt?.(J,G),(w.litHtmlVersions??=[]).push("3.3.3");const nt=globalThis;class ot extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let r=i._$litPart$;if(void 0===r){const t=s?.renderBefore??null;i._$litPart$=r=new G(e.insertBefore(M(),t),t,void 0,s??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}ot._$litElement$=!0,ot.finalized=!0,nt.litElementHydrateSupport?.({LitElement:ot});const at=nt.litElementPolyfillSupport;at?.({LitElement:ot}),(nt.litElementVersions??=[]).push("4.2.2");console.info("%c slideshow-card %c 0.2.0 ","color: white; background: #222; font-weight: 700","color: #222; background: #ccc");class ht extends ot{static properties={hass:{attribute:!1},_children:{state:!0},_index:{state:!0},_layerAIdx:{state:!0},_layerBIdx:{state:!0},_topIsA:{state:!0},_playing:{state:!0},_loading:{state:!0},_error:{state:!0},_showControls:{state:!0}};constructor(){super(),this._children=[],this._index=0,this._layerAIdx=null,this._layerBIdx=null,this._topIsA=!0,this._playing=!0,this._loading=!0,this._error=null,this._showControls=!1,this._urlCache=new Map,this._advanceTimer=null,this._controlsTimer=null,this._swipe=null}setConfig(t){if(!t?.folder)throw new Error("folder is required");this._config={title:"",interval:3,order:"desc",...t,folder:this._normalizeFolder(t.folder)}}_normalizeFolder(t){const e=String(t).trim().replace(/\/+$/,"");return e.startsWith("media-source://")?e:e.startsWith("/media/")||e.startsWith("/local/")?"media-source://media_source/local/"+e.slice(7):e.startsWith("/")?"media-source://media_source/local"+e:"media-source://media_source/local/"+e}static getConfigElement(){return null}static getStubConfig(){return{folder:"media-source://media_source/local/"}}getCardSize(){return 6}connectedCallback(){super.connectedCallback(),this._loadFolder()}disconnectedCallback(){super.disconnectedCallback(),this._stopAdvance(),this._controlsTimer&&clearTimeout(this._controlsTimer)}updated(t){t.has("hass")&&!t.get("hass")&&0===this._children.length&&this._loadFolder()}async _loadFolder(){if(this.hass){this._loading=!0,this._error=null;try{let t=((await this.hass.callWS({type:"media_source/browse_media",media_content_id:this._config.folder})).children||[]).filter(t=>!t.can_expand&&"image"===t.media_class);"asc"===this._config.order&&t.reverse(),this._children=t,this._index=0,this._layerAIdx=t.length>0?0:null,this._layerBIdx=null,this._topIsA=!0,this._loading=!1,t.length>0&&(await this._resolve(0),this._preload(1),this._preload(t.length-1),this.requestUpdate(),this._startAdvance())}catch(t){this._loading=!1,this._error=t?.message||String(t)}}}async _resolve(t){const e=this._children[t];if(!e)return null;if(this._urlCache.has(e.media_content_id))return this._urlCache.get(e.media_content_id);const s=(await this.hass.callWS({type:"media_source/resolve_media",media_content_id:e.media_content_id})).url;return this._urlCache.set(e.media_content_id,s),s}async _preload(t){if(t<0||t>=this._children.length)return;const e=await this._resolve(t);if(!e)return;const s=new Image;s.decoding="async",s.src=e}_startAdvance(){if(this._stopAdvance(),!this._playing)return;const t=1e3*Math.max(.5,Number(this._config.interval)||3);this._advanceTimer=setTimeout(()=>this._next(),t)}_stopAdvance(){this._advanceTimer&&(clearTimeout(this._advanceTimer),this._advanceTimer=null)}_next(){0!==this._children.length&&this._goTo((this._index+1)%this._children.length)}_prev(){0!==this._children.length&&this._goTo((this._index-1+this._children.length)%this._children.length)}async _goTo(t){t===this._index||t<0||t>=this._children.length||(await this._resolve(t),this._topIsA?this._layerBIdx=t:this._layerAIdx=t,this._topIsA=!this._topIsA,this._index=t,this._preload(t+1),this._preload(t-1),this._startAdvance())}_extractDate(t){if(!t)return"";const e=t.match(/(\d{4})[-_](\d{2})[-_](\d{2})[-_ T](\d{2})[-_:](\d{2})(?:[-_:](\d{2}))?/);if(!e)return t;const[,s,i,r,n,o,a]=e;return`${r}.${i}.${s} ${n}:${o}${a?":"+a:""}`}_togglePlay(){this._playing=!this._playing,this._playing?this._startAdvance():this._stopAdvance()}_onSliderInput(t){const e=Number(t.target.value);this._goTo(e)}_onPointerDown(t){"mouse"===t.pointerType&&0!==t.button||(this._swipe={x:t.clientX,y:t.clientY,t:Date.now(),id:t.pointerId},t.currentTarget.setPointerCapture?.(t.pointerId),this._showControlsTransient())}_onPointerUp(t){if(!this._swipe||this._swipe.id!==t.pointerId)return;const e=t.clientX-this._swipe.x,s=t.clientY-this._swipe.y,i=Date.now()-this._swipe.t,r=Math.abs(e)>40&&Math.abs(e)>1.5*Math.abs(s)&&i<600;this._swipe=null,r&&(e<0?this._next():this._prev())}_stop(t){t.stopPropagation()}_onPointerCancel(){this._swipe=null}_showControlsTransient(){this._showControls=!0,this._controlsTimer&&clearTimeout(this._controlsTimer),this._controlsTimer=setTimeout(()=>{this._showControls=!1},2500)}_renderLayer(t,e){if(null==t)return j`<div class="layer ${e?"visible":""}"></div>`;const s=this._children[t],i=s?this._urlCache.get(s.media_content_id):null;return i?j`<img
      class="layer ${e?"visible":""}"
      src=${i}
      decoding="async"
      draggable="false"
      alt=""
    />`:j`<div class="layer ${e?"visible":""}"></div>`}render(){if(!this._config)return q;if(this._loading)return j`<ha-card><div class="status">Lade…</div></ha-card>`;if(this._error)return j`<ha-card><div class="status error">${this._error}</div></ha-card>`;if(0===this._children.length)return j`<ha-card><div class="status">Keine Bilder gefunden</div></ha-card>`;const t=this._children.length,e=this._children[this._index],s=this._extractDate(e?.title);return j`
      <ha-card .header=${this._config.title||q}>
        <div
          class="viewport ${this._showControls?"show":""}"
          @pointerdown=${this._onPointerDown}
          @pointerup=${this._onPointerUp}
          @pointercancel=${this._onPointerCancel}
          @mousemove=${this._showControlsTransient}
        >
          ${this._renderLayer(this._layerAIdx,this._topIsA)}
          ${this._renderLayer(this._layerBIdx,!this._topIsA)}
          <div class="overlay">
            <input
              class="scrub"
              type="range"
              min="0"
              max=${t-1}
              .value=${String(this._index)}
              @input=${this._onSliderInput}
              @pointerdown=${this._stop}
              @click=${this._stop}
            />
            <div class="bar">
              <button class="ctrl" title="Zurück"
                @pointerdown=${this._stop}
                @click=${t=>{t.stopPropagation(),this._prev()}}>‹</button>
              <button class="ctrl" title=${this._playing?"Pause":"Play"}
                @pointerdown=${this._stop}
                @click=${t=>{t.stopPropagation(),this._togglePlay()}}>${this._playing?"⏸":"▶"}</button>
              <button class="ctrl" title="Vor"
                @pointerdown=${this._stop}
                @click=${t=>{t.stopPropagation(),this._next()}}>›</button>
              <span class="counter">${this._index+1} / ${t}</span>
              <span class="name">${s}</span>
            </div>
          </div>
        </div>
      </ha-card>
    `}static styles=n`
    :host {
      display: block;
    }
    ha-card {
      overflow: hidden;
    }
    .status {
      padding: 24px;
      text-align: center;
      color: var(--secondary-text-color);
    }
    .status.error {
      color: var(--error-color);
    }
    .viewport {
      position: relative;
      width: 100%;
      aspect-ratio: 4 / 3;
      background: #000;
      touch-action: pan-y;
      user-select: none;
      -webkit-user-select: none;
      overflow: hidden;
    }
    .layer {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
      opacity: 0;
      transition: opacity 0.5s ease;
      will-change: opacity;
    }
    .layer.visible {
      opacity: 1;
    }
    .overlay {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 8px 12px 10px;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0));
      opacity: 0;
      transition: opacity 0.2s ease;
      pointer-events: none;
    }
    .viewport.show .overlay,
    .viewport:hover .overlay {
      opacity: 1;
      pointer-events: auto;
    }
    .scrub {
      width: 100%;
      margin: 0;
      accent-color: var(--primary-color, #03a9f4);
      cursor: pointer;
    }
    .ctrl {
      background: transparent;
      border: none;
      color: #fff;
      font-size: 1.4rem;
      line-height: 1;
      padding: 4px 8px;
      cursor: pointer;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
      transition: opacity 0.15s ease;
      opacity: 0.85;
    }
    .ctrl:hover {
      opacity: 1;
    }
    .ctrl:active {
      transform: scale(0.92);
    }
    .bar {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #fff;
      font-size: 0.8rem;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
    }
    .counter {
      font-variant-numeric: tabular-nums;
    }
    .name {
      margin-left: auto;
      opacity: 0.8;
      max-width: 50%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `}customElements.define("slideshow-card",ht),window.customCards=window.customCards||[],window.customCards.push({type:"slideshow-card",name:"Slideshow Card",description:"Photo slideshow from a media-source folder"});
