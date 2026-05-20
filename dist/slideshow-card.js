const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=i.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(s,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new n(i,t,s)},o=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:a,defineProperty:h,getOwnPropertyDescriptor:l,getOwnPropertyNames:c,getOwnPropertySymbols:d,getPrototypeOf:_}=Object,u=globalThis,p=u.trustedTypes,g=p?p.emptyScript:"",m=u.reactiveElementPolyfillSupport,$=(t,e)=>t,f={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},y=(t,e)=>!a(t,e),v={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&h(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const r=i?.call(this);n?.call(this,e),this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??v}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=_(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...c(t),...d(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((s,i)=>{if(e)s.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of i){const i=document.createElement("style"),n=t.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=e.cssText,s.appendChild(i)}})(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const n=(void 0!==s.converter?.toAttribute?s.converter:f).toAttribute(e,s.type);this._$Em=t,null==n?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:f;this._$Em=i;const r=n.fromAttribute(e,t.type);this[i]=r??this._$Ej?.get(i)??r,this._$Em=null}}requestUpdate(t,e,s,i=!1,n){if(void 0!==t){const r=this.constructor;if(!1===i&&(n=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??y)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==n||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[$("elementProperties")]=new Map,A[$("finalized")]=new Map,m?.({ReactiveElement:A}),(u.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,b=t=>t,x=w.trustedTypes,S=x?x.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,T=`<${P}>`,I=document,U=()=>I.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,M="[ \t\n\f\r]",k=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,H=/>/g,L=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),q=/'/g,z=/"/g,D=/^(?:script|style|textarea|title)$/i,F=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),j=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),W=new WeakMap,V=I.createTreeWalker(I,129);function K(t,e){if(!R(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Z=(t,e)=>{const s=t.length-1,i=[];let n,r=2===e?"<svg>":3===e?"<math>":"",o=k;for(let e=0;e<s;e++){const s=t[e];let a,h,l=-1,c=0;for(;c<s.length&&(o.lastIndex=c,h=o.exec(s),null!==h);)c=o.lastIndex,o===k?"!--"===h[1]?o=N:void 0!==h[1]?o=H:void 0!==h[2]?(D.test(h[2])&&(n=RegExp("</"+h[2],"g")),o=L):void 0!==h[3]&&(o=L):o===L?">"===h[0]?(o=n??k,l=-1):void 0===h[1]?l=-2:(l=o.lastIndex-h[2].length,a=h[1],o=void 0===h[3]?L:'"'===h[3]?z:q):o===z||o===q?o=L:o===N||o===H?o=k:(o=L,n=void 0);const d=o===L&&t[e+1].startsWith("/>")?" ":"";r+=o===k?s+T:l>=0?(i.push(a),s.slice(0,l)+E+s.slice(l)+C+d):s+C+(-2===l?e:d)}return[K(t,r+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class J{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,r=0;const o=t.length-1,a=this.parts,[h,l]=Z(t,e);if(this.el=J.createElement(h,s),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=V.nextNode())&&a.length<o;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(E)){const e=l[r++],s=i.getAttribute(t).split(C),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:o[2],strings:s,ctor:"."===o[1]?tt:"?"===o[1]?et:"@"===o[1]?st:Q}),i.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:n}),i.removeAttribute(t));if(D.test(i.tagName)){const t=i.textContent.split(C),e=t.length-1;if(e>0){i.textContent=x?x.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],U()),V.nextNode(),a.push({type:2,index:++n});i.append(t[e],U())}}}else if(8===i.nodeType)if(i.data===P)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=i.data.indexOf(C,t+1));)a.push({type:7,index:n}),t+=C.length-1}n++}}static createElement(t,e){const s=I.createElement("template");return s.innerHTML=t,s}}function X(t,e,s=t,i){if(e===j)return e;let n=void 0!==i?s._$Co?.[i]:s._$Cl;const r=O(e)?void 0:e._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(t),n._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=n:s._$Cl=n),void 0!==n&&(e=X(t,n._$AS(t,e.values),n,i)),e}class Y{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??I).importNode(e,!0);V.currentNode=i;let n=V.nextNode(),r=0,o=0,a=s[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new G(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new it(n,this,t)),this._$AV.push(e),a=s[++o]}r!==a?.index&&(n=V.nextNode(),r++)}return V.currentNode=I,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class G{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),O(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==j&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>R(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==B&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(I.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=J.createElement(K(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Y(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new J(t)),e}k(t){R(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new G(this.O(U()),this.O(U()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=b(t).nextSibling;b(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=B}_$AI(t,e=this,s,i){const n=this.strings;let r=!1;if(void 0===n)t=X(this,t,e,0),r=!O(t)||t!==this._$AH&&t!==j,r&&(this._$AH=t);else{const i=t;let o,a;for(t=n[0],o=0;o<n.length-1;o++)a=X(this,i[s+o],e,o),a===j&&(a=this._$AH[o]),r||=!O(a)||a!==this._$AH[o],a===B?t=B:t!==B&&(t+=(a??"")+n[o+1]),this._$AH[o]=a}r&&!i&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}class et extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==B)}}class st extends Q{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??B)===j)return;const s=this._$AH,i=t===B&&s!==B||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==B&&(s===B||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const nt=w.litHtmlPolyfillSupport;nt?.(J,G),(w.litHtmlVersions??=[]).push("3.3.3");const rt=globalThis;class ot extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let n=i._$litPart$;if(void 0===n){const t=s?.renderBefore??null;i._$litPart$=n=new G(e.insertBefore(U(),t),t,void 0,s??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}}ot._$litElement$=!0,ot.finalized=!0,rt.litElementHydrateSupport?.({LitElement:ot});const at=rt.litElementPolyfillSupport;at?.({LitElement:ot}),(rt.litElementVersions??=[]).push("4.2.2");console.info("%c slideshow-card %c 0.6.0 ","color: white; background: #222; font-weight: 700","color: #222; background: #ccc");class ht extends ot{static properties={hass:{attribute:!1},_children:{state:!0},_index:{state:!0},_primaryIdx:{state:!0},_transientIdx:{state:!0},_transientOpaque:{state:!0},_playing:{state:!0},_loading:{state:!0},_error:{state:!0},_showControls:{state:!0},_fullscreen:{state:!0}};constructor(){super(),this._children=[],this._index=0,this._primaryIdx=null,this._transientIdx=null,this._transientOpaque=!1,this._playing=!0,this._loading=!0,this._error=null,this._showControls=!1,this._fullscreen=!1,this._onFullscreenChange=()=>{this._fullscreen=!!document.fullscreenElement},this._urlCache=new Map,this._loadingIdx=new Map,this._loadedIdx=new Set,this._advanceTimer=null,this._controlsTimer=null,this._scrubRaf=null,this._swipe=null}setConfig(t){if(!t?.folder)throw new Error("folder is required");this._config={title:"",interval:3,order:"desc",...t,folder:this._normalizeFolder(t.folder)}}_normalizeFolder(t){const e=String(t).trim().replace(/\/+$/,"");return e.startsWith("media-source://")?e:e.startsWith("/media/")||e.startsWith("/local/")?"media-source://media_source/local/"+e.slice(7):e.startsWith("/")?"media-source://media_source/local"+e:"media-source://media_source/local/"+e}static getConfigElement(){return null}static getStubConfig(){return{folder:"media-source://media_source/local/"}}getCardSize(){return 6}connectedCallback(){super.connectedCallback(),document.addEventListener("fullscreenchange",this._onFullscreenChange),this._loadFolder()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("fullscreenchange",this._onFullscreenChange),this._stopAdvance(),this._controlsTimer&&clearTimeout(this._controlsTimer)}updated(t){t.has("hass")&&!t.get("hass")&&0===this._children.length&&this._loadFolder()}async _loadFolder(){if(this.hass){this._loading=!0,this._error=null;try{let t=((await this.hass.callWS({type:"media_source/browse_media",media_content_id:this._config.folder})).children||[]).filter(t=>!t.can_expand&&"image"===t.media_class);"asc"===this._config.order&&t.reverse(),this._children=t,this._index=0,this._primaryIdx=null,this._transientIdx=null,this._transientOpaque=!1,this._loadingIdx.clear(),this._loadedIdx.clear(),this._loading=!1,t.length>0&&(this._scheduleLoads(),this._startAdvance(),this._preResolveAll())}catch(t){this._loading=!1,this._error=t?.message||String(t)}}}async _resolveUrl(t){if(this._urlCache.has(t.media_content_id))return this._urlCache.get(t.media_content_id);const e=await this.hass.callWS({type:"media_source/resolve_media",media_content_id:t.media_content_id});return this._urlCache.set(t.media_content_id,e.url),e.url}async _preResolveAll(){const t=this._children;let e=0;const s=Array(4).fill(null).map(async()=>{for(;e<t.length&&this._children===t;){const s=e++,i=t[s];if(!this._urlCache.has(i.media_content_id))try{await this._resolveUrl(i)}catch{}}});await Promise.all(s)}_wishList(){const t=this._index,e=this._children.length,s=[t];for(let i=1;i<=2;i++)t+i<e&&s.push(t+i),t-i>=0&&s.push(t-i);return s}_scheduleLoads(){if(0===this._children.length)return;const t=this._wishList(),e=new Set(t);for(const[t,s]of this._loadingIdx)e.has(t)||(s.src="",this._loadingIdx.delete(t));for(const e of t){if(this._loadingIdx.size>=2)break;this._loadedIdx.has(e)||(this._loadingIdx.has(e)||this._startLoad(e))}}async _startLoad(t){const e=this._children[t];if(!e)return;let s;try{s=await this._resolveUrl(e)}catch{return}if(t>=this._children.length||this._children[t]!==e)return;if(!this._wishList().includes(t))return;const i=new Image;i.decoding="async",this._loadingIdx.set(t,i),i.onload=()=>{this._loadingIdx.get(t)===i&&(this._loadingIdx.delete(t),this._loadedIdx.add(t),t===this._index&&this._maybeSwapLayer(),this._scheduleLoads())},i.onerror=()=>{this._loadingIdx.get(t)===i&&(this._loadingIdx.delete(t),this._scheduleLoads())},i.src=s}_maybeSwapLayer(){const t=this._index;if(this._loadedIdx.has(t))return null===this._primaryIdx?(this._primaryIdx=t,void this.requestUpdate()):void(this._primaryIdx!==t&&(null!==this._transientIdx&&(this._primaryIdx=this._transientIdx),this._transientIdx=t,this._transientOpaque=!1,this.requestUpdate(),requestAnimationFrame(()=>requestAnimationFrame(()=>{this._transientIdx===t&&(this._transientOpaque=!0,this.requestUpdate())}))))}_onTransitionEnd(t){"opacity"===t.propertyName&&null!==this._transientIdx&&this._transientOpaque&&(this._primaryIdx=this._transientIdx,this._transientIdx=null,this._transientOpaque=!1,this.requestUpdate())}_startAdvance(){if(this._stopAdvance(),!this._playing)return;const t=1e3*Math.max(.5,Number(this._config.interval)||3);this._advanceTimer=setTimeout(()=>this._next(),t)}_stopAdvance(){this._advanceTimer&&(clearTimeout(this._advanceTimer),this._advanceTimer=null)}_next(){0!==this._children.length&&this._goTo((this._index+1)%this._children.length)}_prev(){0!==this._children.length&&this._goTo((this._index-1+this._children.length)%this._children.length)}_goTo(t){if(t<0||t>=this._children.length)return;const e=t!==this._index;this._index=t,this._scheduleLoads(),this._maybeSwapLayer(),e&&this._startAdvance()}_extractDate(t){if(!t)return"";const e=t.match(/(\d{4})[-_](\d{2})[-_](\d{2})[-_ T](\d{2})[-_:](\d{2})(?:[-_:](\d{2}))?/);if(!e)return t;const[,s,i,n,r,o,a]=e;return`${n}.${i}.${s} ${r}:${o}${a?":"+a:""}`}_togglePlay(){this._playing=!this._playing,this._playing?this._startAdvance():this._stopAdvance()}_onScrubInput(t){const e=Number(t.target.value);e!==this._index&&(this._index=e,this._maybeSwapLayer(),null===this._scrubRaf&&(this._scrubRaf=requestAnimationFrame(()=>{this._scrubRaf=null,this._scheduleLoads()})))}_onScrubChange(t){const e=Number(t.target.value);this._goTo(e)}_onScrubStart(t){t.stopPropagation(),this._wasPlayingBeforeScrub=this._playing,this._stopAdvance()}_onScrubEnd(t){null!==this._scrubRaf&&(cancelAnimationFrame(this._scrubRaf),this._scrubRaf=null);const e=void 0!==t?.target?.value?Number(t.target.value):this._index;this._goTo(e),this._wasPlayingBeforeScrub&&this._startAdvance()}_onPointerDown(t){"mouse"===t.pointerType&&0!==t.button||(this._swipe={x:t.clientX,y:t.clientY,t:Date.now(),id:t.pointerId},t.currentTarget.setPointerCapture?.(t.pointerId),this._showControlsTransient())}_onPointerUp(t){if(!this._swipe||this._swipe.id!==t.pointerId)return;const e=t.clientX-this._swipe.x,s=t.clientY-this._swipe.y,i=Date.now()-this._swipe.t,n=Math.abs(e)>40&&Math.abs(e)>1.5*Math.abs(s)&&i<600;this._swipe=null,n&&(e<0?this._next():this._prev())}_stop(t){t.stopPropagation()}_onPointerCancel(){this._swipe=null}_showControlsTransient(){this._showControls=!0,this._controlsTimer&&clearTimeout(this._controlsTimer),this._controlsTimer=setTimeout(()=>{this._showControls=!1},2500)}_imgUrlForIdx(t){if(null==t)return null;const e=this._children[t];return e?this._urlCache.get(e.media_content_id):null}render(){if(!this._config)return B;if(this._loading)return F`<ha-card><div class="status">Lade…</div></ha-card>`;if(this._error)return F`<ha-card><div class="status error">${this._error}</div></ha-card>`;if(0===this._children.length)return F`<ha-card><div class="status">Keine Bilder gefunden</div></ha-card>`;const t=this._children.length,e=this._children[this._index],s=this._extractDate(e?.title),i=this._imgUrlForIdx(this._primaryIdx),n=this._imgUrlForIdx(this._transientIdx);return F`
      <ha-card .header=${this._config.title||B}>
        <div
          class="viewport ${this._showControls?"show":""}"
          @pointerdown=${this._onPointerDown}
          @pointerup=${this._onPointerUp}
          @pointercancel=${this._onPointerCancel}
          @mousemove=${this._showControlsTransient}
        >
          ${i?F`<img class="layer primary" src=${i} decoding="async" draggable="false" alt="" />`:B}
          ${n?F`<img
                class="layer transient ${this._transientOpaque?"opaque":""}"
                src=${n}
                decoding="async"
                draggable="false"
                alt=""
                @transitionend=${this._onTransitionEnd}
              />`:B}
          <div class="overlay">
            <input
              class="scrub"
              type="range"
              min="0"
              max=${t-1}
              .value=${String(this._index)}
              @input=${this._onScrubInput}
              @change=${this._onScrubChange}
              @pointerdown=${this._onScrubStart}
              @pointerup=${this._onScrubEnd}
              @pointercancel=${this._onScrubEnd}
              @click=${this._stop}
            />
            <div class="bar">
              <ha-icon-button label="Zurück"
                @pointerdown=${this._stop}
                @click=${t=>{t.stopPropagation(),this._prev()}}>
                <ha-icon icon="mdi:chevron-left"></ha-icon>
              </ha-icon-button>
              <ha-icon-button label=${this._playing?"Pause":"Play"}
                @pointerdown=${this._stop}
                @click=${t=>{t.stopPropagation(),this._togglePlay()}}>
                <ha-icon icon=${this._playing?"mdi:pause":"mdi:play"}></ha-icon>
              </ha-icon-button>
              <ha-icon-button label="Vor"
                @pointerdown=${this._stop}
                @click=${t=>{t.stopPropagation(),this._next()}}>
                <ha-icon icon="mdi:chevron-right"></ha-icon>
              </ha-icon-button>
              <span class="counter">${this._index+1} / ${t}</span>
              <span class="name">${s}</span>
              <ha-icon-button label="Vollbild"
                @pointerdown=${this._stop}
                @click=${t=>{t.stopPropagation(),this._toggleFullscreen()}}>
                <ha-icon icon=${this._fullscreen?"mdi:fullscreen-exit":"mdi:fullscreen"}></ha-icon>
              </ha-icon-button>
            </div>
          </div>
        </div>
      </ha-card>
    `}async _toggleFullscreen(){const t=this.renderRoot.querySelector(".viewport");if(t)if(document.fullscreenElement)try{await document.exitFullscreen()}catch{}else try{await t.requestFullscreen()}catch{}}static styles=r`
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
      will-change: opacity;
    }
    .layer.primary {
      opacity: 1;
      z-index: 1;
    }
    .layer.transient {
      opacity: 0;
      transition: opacity 0.5s ease;
      z-index: 2;
    }
    .layer.transient.opaque {
      opacity: 1;
    }
    .viewport:fullscreen {
      width: 100vw;
      height: 100vh;
      aspect-ratio: auto;
    }
    .viewport:-webkit-full-screen {
      width: 100vw;
      height: 100vh;
    }
    .overlay {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 3;
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
    .bar ha-icon-button {
      --mdc-icon-button-size: 36px;
      --mdc-icon-size: 22px;
      color: #fff;
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
      font-variant-numeric: tabular-nums;
    }
  `}customElements.define("slideshow-card",ht),window.customCards=window.customCards||[],window.customCards.push({type:"slideshow-card",name:"Slideshow Card",description:"Photo slideshow from a media-source folder"});
