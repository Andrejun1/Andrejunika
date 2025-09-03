import React, { useRef, useEffect, useState } from 'react';

const MouseBackground = () => {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const animationRef = useRef();

  // Konfigurasi untuk efek jaring yang smooth
  const config = {
    particleCount: 60,
    maxDistance: 140,
    mouseRadius: 180,
    particleSpeed: 0.3,
    lineOpacity: 0.25,
    particleSize: 2.5,
    mouseForce: 0.015,
    returnSpeed: 0.03
  };

  // Inisialisasi partikel
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < config.particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * config.particleSpeed,
          vy: (Math.random() - 0.5) * config.particleSpeed,
          originalVx: (Math.random() - 0.5) * config.particleSpeed,
          originalVy: (Math.random() - 0.5) * config.particleSpeed,
          size: config.particleSize + Math.random() * 1,
          opacity: 0.6 + Math.random() * 0.4
        });
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animasi loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = particlesRef.current;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update dan gambar partikel
      particles.forEach((particle, i) => {
        // Hitung jarak ke mouse
        const dx = mousePos.x - particle.x;
        const dy = mousePos.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Efek mouse - tarik partikel ke mouse dengan smooth
        if (distance < config.mouseRadius) {
          const force = (config.mouseRadius - distance) / config.mouseRadius;
          const angle = Math.atan2(dy, dx);
          
          // Tarik partikel ke mouse
          particle.vx += Math.cos(angle) * force * config.mouseForce;
          particle.vy += Math.sin(angle) * force * config.mouseForce;
          
          // Efek membesar saat dekat mouse
          const targetSize = config.particleSize * 2;
          particle.size += (targetSize - particle.size) * 0.1;
          particle.opacity = Math.min(1, particle.opacity + 0.02);
        } else {
          // Kembalikan ke kecepatan original secara bertahap
          particle.vx += (particle.originalVx - particle.vx) * config.returnSpeed;
          particle.vy += (particle.originalVy - particle.vy) * config.returnSpeed;
          
          // Kembalikan ukuran dan opacity
          particle.size += (config.particleSize - particle.size) * 0.05;
          particle.opacity = Math.max(0.6, particle.opacity - 0.01);
        }

        // Update posisi
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges (lebih smooth)
        if (particle.x < -10) particle.x = canvas.width + 10;
        if (particle.x > canvas.width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = canvas.height + 10;
        if (particle.y > canvas.height + 10) particle.y = -10;

        // Limit kecepatan
        particle.vx = Math.max(-1, Math.min(1, particle.vx));
        particle.vy = Math.max(-1, Math.min(1, particle.vy));

        // Gambar partikel dengan glow effect
        ctx.save();
        ctx.shadowBlur = particle.size * 2;
        ctx.shadowColor = '#ff2bb3';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 43, 179, ${particle.opacity})`;
        ctx.fill();
        ctx.restore();

        // Gambar garis koneksi ke partikel lain
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < config.maxDistance) {
            const opacity = (1 - distance / config.maxDistance) * config.lineOpacity;
            
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(255, 43, 179, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Garis khusus ke mouse jika dekat (efek jaring)
        const mouseDistance = Math.sqrt(
          (mousePos.x - particle.x) ** 2 + (mousePos.y - particle.y) ** 2
        );
        
        if (mouseDistance < config.mouseRadius) {
          const opacity = (1 - mouseDistance / config.mouseRadius) * 0.6;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mousePos.x, mousePos.y);
          ctx.strokeStyle = `rgba(255, 43, 179, ${opacity})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      // Gambar efek mouse dengan pulse
      const pulseSize = 8 + Math.sin(Date.now() * 0.003) * 3;
      ctx.save();
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#ff2bb3';
      ctx.beginPath();
      ctx.arc(mousePos.x, mousePos.y, pulseSize, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 43, 179, 0.8)';
      ctx.fill();
      
      // Inner glow
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(mousePos.x, mousePos.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 43, 179, 1)';
      ctx.fill();
      ctx.restore();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePos]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
};

export default MouseBackground;