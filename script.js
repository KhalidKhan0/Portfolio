document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Vector {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        getDistance(v) {
            const dx = this.x - v.x;
            const dy = this.y - v.y;
            return Math.sqrt(dx * dx + dy * dy);
        }
    }

    class Agent {
        constructor(x, y) {
            this.pos = new Vector(x, y);
            this.vel = new Vector(randomRange(-1, 1), randomRange(-1, 1));
            this.radius = randomRange(4, 12);
        }

        bounce(width, height) {
            if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
            if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
        }

        update() {
            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;
        }

        draw(context) {
            context.save();
            context.translate(this.pos.x, this.pos.y);
            
            context.lineWidth = 4;
            context.beginPath();
            context.arc(0, 0, this.radius, 0, Math.PI * 2);
            context.fill();
            context.stroke();
            context.restore();
        }
    }

    const agents = [];
    for (let i = 0; i < 100; i++) {
        const x = randomRange(0, canvas.width);
        const y = randomRange(0, canvas.height);
        agents.push(new Agent(x, y));
    }

    function animate() {
        
        context.fillStyle = '#333'; 
        context.fillRect(0, 0, canvas.width, canvas.height);

        agents.forEach(agent => {
            agents.forEach(other => {
                const dist = agent.pos.getDistance(other.pos);
                if (dist > 200 || agent === other) return;
                
                context.strokeStyle = '#fff'; 
                context.lineWidth = mapRange(dist, 0, 200, 12, 1);
                context.beginPath();
                context.moveTo(agent.pos.x, agent.pos.y);
                context.lineTo(other.pos.x, other.pos.y);
                context.stroke();
            });

            agent.update();
            agent.draw(context);
            agent.bounce(canvas.width, canvas.height);
        });

        requestAnimationFrame(animate);
    }

    animate();

    function randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    function mapRange(value, a, b, c, d) {
        value = (value - a) / (b - a);
        return c + value * (d - c);
    }
});
