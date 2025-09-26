
import React, { useEffect, useRef } from 'react';
import { Chart, RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip } from 'chart.js';

Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

interface ProcessProps {
    content: {
        title: string;
        subtitle: string;
        chartLabels: string[];
    };
    isAdmin: boolean;
}

const Process: React.FC<ProcessProps> = ({ content, isAdmin }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!chartRef.current) return;
        
        const ctx = chartRef.current.getContext('2d');
        if (!ctx) return;

        const chartInstance = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: content.chartLabels,
                datasets: [{
                    label: 'Tahapan Proses',
                    data: [5, 4, 4, 5, 5],
                    backgroundColor: 'rgba(2, 132, 199, 0.2)',
                    borderColor: 'rgba(2, 132, 199, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(2, 132, 199, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(2, 132, 199, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(30, 41, 59, 0.2)'
                        },
                        grid: {
                            color: 'rgba(30, 41, 59, 0.2)'
                        },
                        pointLabels: {
                            font: {
                                size: 12,
                                weight: 'bold'
                            },
                            color: '#1e293b'
                        },
                        ticks: {
                            backdropColor: 'transparent',
                            display: false,
                            stepSize: 1
                        },
                        suggestedMin: 0,
                        suggestedMax: 5
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false,
                    }
                }
            }
        });
        
        return () => {
            chartInstance.destroy();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content.chartLabels]);

    return (
        <section id="process" className="py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className={`text-3xl font-bold text-slate-900 inline-flex items-center ${isAdmin ? 'editable-outline' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning data-content-key="process.title">
                         <span className="section-title-icon" aria-hidden="true">
                           <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 3.75H19.5M8.25 6.75H19.5M8.25 9.75H19.5M8.25 12.75H19.5m-15-9A1.5 1.5 0 014.5 2.25h15A1.5 1.5 0 0121 3.75v16.5A1.5 1.5 0 0119.5 21.75h-15A1.5 1.5 0 013 20.25V3.75zM4.5 6.75h1.5v1.5H4.5v-1.5zM4.5 9.75h1.5v1.5H4.5v-1.5zM4.5 12.75h1.5v1.5H4.5v-1.5zM4.5 15.75h1.5v1.5H4.5v-1.5z" /></svg>
                        </span>
                        {content.title}
                    </h2>
                    <p className={`mt-2 text-slate-600 max-w-2xl mx-auto prose-justify ${isAdmin ? 'editable-outline' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning data-content-key="process.subtitle">{content.subtitle}</p>
                </div>
                <div className="relative w-full max-w-lg mx-auto h-80 md:h-96">
                    <canvas ref={chartRef}></canvas>
                </div>
            </div>
        </section>
    );
};

export default Process;