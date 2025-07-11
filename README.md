#<svg viewBox="0 0 320 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Neon green and dark blue gradient for the main logo -->
    <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#00ff41;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#0066cc;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#001a33;stop-opacity:1" />
    </linearGradient>
    
    <!-- Secondary neon green and dark blue gradient -->
    <linearGradient id="secondaryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#39ff14;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#0052a3;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#002244;stop-opacity:1" />
    </linearGradient>
    
    <!-- Enhanced glow effect for neon -->
    <filter id="glow">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge> 
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <!-- Main icon container -->
  <g transform="translate(15, 25)">
    <!-- Outer ring -->
    <circle cx="25" cy="25" r="22" fill="none" stroke="url(#primaryGradient)" stroke-width="2" opacity="0.3"/>
    
    <!-- Inner flowing elements -->
    <g>
      <!-- Central connection point -->
      <circle cx="25" cy="25" r="4" fill="url(#primaryGradient)" filter="url(#glow)">
        <animate attributeName="r" values="3;5;3" dur="3s" repeatCount="indefinite"/>
      </circle>
      
      <!-- Orbital streaming elements -->
      <circle cx="40" cy="25" r="3" fill="url(#secondaryGradient)">
        <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 25 25" to="360 25 25" dur="8s" repeatCount="indefinite"/>
      </circle>
      
      <circle cx="25" cy="10" r="2.5" fill="url(#primaryGradient)" opacity="0.8">
        <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 25 25" to="360 25 25" dur="6s" repeatCount="indefinite"/>
      </circle>
      
      <circle cx="10" cy="25" r="2" fill="url(#secondaryGradient)" opacity="0.9">
        <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 25 25" to="360 25 25" dur="10s" repeatCount="indefinite"/>
      </circle>
      
      <!-- Connecting streams -->
      <path d="M 25 25 Q 35 15 40 25" stroke="url(#primaryGradient)" stroke-width="2" fill="none" opacity="0.6">
        <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2s" repeatCount="indefinite"/>
      </path>
      
      <path d="M 25 25 Q 15 35 10 25" stroke="url(#secondaryGradient)" stroke-width="2" fill="none" opacity="0.6">
        <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2.5s" repeatCount="indefinite"/>
      </path>
    </g>
    
    <!-- Media icons integrated into design -->
    <g transform="translate(32, 35)">
      <!-- Video camera icon -->
      <rect x="0" y="0" width="6" height="4" rx="1" fill="url(#primaryGradient)" opacity="0.7"/>
      <polygon points="6,1 9,0 9,4 6,3" fill="url(#secondaryGradient)" opacity="0.7"/>
    </g>
    
    <g transform="translate(8, 35)">
      <!-- Chat bubble with modern styling -->
      <path d="M 0 0 Q 0 -3 3 -3 L 9 -3 Q 12 -3 12 0 L 12 2 Q 12 5 9 5 L 4 5 L 1 7 L 3 5 L 3 5 Q 0 5 0 2 Z" fill="url(#primaryGradient)" opacity="0.7"/>
      <circle cx="4" cy="1" r="0.5" fill="white"/>
      <circle cx="6" cy="1" r="0.5" fill="white"/>
      <circle cx="8" cy="1" r="0.5" fill="white"/>
    </g>
  </g>
  
  <!-- Company name with modern typography in rectangular rounded box -->
  <rect x="75" y="35" width="150" height="30" rx="15" ry="15" fill="none" stroke="url(#primaryGradient)" stroke-width="2" opacity="0.8"/>
  <rect x="77" y="37" width="146" height="26" rx="13" ry="13" fill="url(#primaryGradient)" opacity="0.1"/>
  <text x="150" y="55" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="url(#primaryGradient)" letter-spacing="-1px" text-anchor="middle">
    Streamileo
  </text>
  
  <!-- Modern tagline -->
  <text x="85" y="78" font-family="Arial, sans-serif" font-size="9" fill="#64748b" font-weight="500" letter-spacing="0.5px">
    CONNECT • SHARE • STREAM
  </text>
  
  <!-- Subtle accent elements -->
  <g opacity="0.2">
    <circle cx="280" cy="20" r="2" fill="url(#primaryGradient)">
      <animate attributeName="opacity" values="0.1;0.5;0.1" dur="4s" repeatCount="indefinite"/>
    </circle>
    <circle cx="290" cy="30" r="1.5" fill="url(#secondaryGradient)">
      <animate attributeName="opacity" values="0.1;0.4;0.1" dur="3s" repeatCount="indefinite"/>
    </circle>
    <circle cx="285" cy="40" r="1" fill="url(#primaryGradient)">
      <animate attributeName="opacity" values="0.1;0.3;0.1" dur="5s" repeatCount="indefinite"/>
    </circle>
  </g>
</svg>#

