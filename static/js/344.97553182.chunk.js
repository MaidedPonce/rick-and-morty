"use strict";(self.webpackChunkrick_and_morty=self.webpackChunkrick_and_morty||[]).push([[344],{344:(e,a,r)=>{r.r(a),r.d(a,{default:()=>c});var s=r(43),l=r(244),o=r(726),i=r(216),n=r(339),d=r(579);const t=()=>{const{user:e,setUser:a,loading:r,setLoading:t}=(0,s.useContext)(l.R),c=(0,i.Zp)();return(0,d.jsx)("div",{className:"flex items-center justify-center",children:(0,d.jsxs)("form",{className:"flex flex-col justify-between gap-4 p-4 border rounded-md h-72 w-72 md:w-96",onSubmit:async r=>{r.preventDefault(),t(!0);try{void 0!==e.email&&await(0,o.U9)(e.email).then((r=>{if(0===r.length){var s;if(void 0!==e.password&&(null===e||void 0===e||null===(s=e.password)||void 0===s?void 0:s.length)<7)return n.Ay.error("La contrase\xf1a debe tener 7 d\xedgitos m\xednimo");(0,o.kz)({email:e.email,password:e.password}).then((r=>{a({...e,user_id:r.user.uid}),t(!1)})).catch((()=>{n.Ay.error("Algo ha salido mal, intenta m\xe1s tarde"),t(!1)}))}else(0,o.iD)({email:null===e||void 0===e?void 0:e.email,password:null===e||void 0===e?void 0:e.password}).then((r=>{a({...e,user_id:r.user.uid}),c("/",{replace:!0})})).catch((e=>{const a=JSON.stringify(e);JSON.parse(a).code.match("auth/wrong-password")?(n.Ay.error("Contrase\xf1a incorrrecta"),t(!1)):(n.Ay.error("Algo ha salido mal, intenta m\xe1s tarde"),t(!1))}))}))}catch(s){n.Ay.error("Algo ha salido mal, intenta m\xe1s tarde")}},children:[(0,d.jsxs)("div",{className:"flex flex-col",children:[(0,d.jsx)("label",{className:"font-semibold",htmlFor:"email",children:"Correo"}),(0,d.jsx)("input",{id:"email",onChange:r=>a({...e,email:r.target.value.trim()}),type:"email",autoComplete:"email",placeholder:"alguien@gmail.com",required:!0,className:"w-full px-2 py-2 border rounded-md outline-none appearance-none focus:ring-blue-500 focus:ring-2 active:ring-blue-500 active:ring-2 peer"})]}),(0,d.jsxs)("div",{className:"flex flex-col",children:[(0,d.jsx)("label",{className:"font-semibold",htmlFor:"password",children:"Password"}),(0,d.jsx)("input",{className:"w-full px-2 py-2 border rounded-md outline-none appearance-none focus:ring-blue-500 focus:ring-2 active:ring-blue-500 active:ring-2 peer",id:"password",placeholder:"********",autoComplete:"new-password",required:!0,min:7,onChange:r=>a({...e,password:r.target.value}),type:"password"})]}),(0,d.jsx)("button",{type:"submit",className:"w-24 p-2 text-white bg-blue-500 rounded-md disabled:cursor-not-allowed disabled:bg-blue-500/70 align-self-center",disabled:""===e.email||""===e.password||r,children:"Entrar"})]})})},c=()=>(0,d.jsx)(t,{})}}]);
//# sourceMappingURL=344.97553182.chunk.js.map