@html

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>목회자 설문조사 국가별 비교</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
            line-height: 1.6;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .header {
            background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
            color: white;
            padding: 40px;
            text-align: center;
        }

        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            font-weight: 700;
        }

        .header p {
            font-size: 1.2rem;
            opacity: 0.9;
        }

        .content {
            padding: 40px;
        }

        .keywords-section {
            background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
            color: white;
            padding: 30px;
            margin-bottom: 40px;
            border-radius: 15px;
        }

        .keywords-title {
            font-size: 1.8rem;
            text-align: center;
            margin-bottom: 30px;
            font-weight: 600;
        }

        .countries-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .country-card {
            background: rgba(255,255,255,0.15);
            padding: 25px;
            border-radius: 12px;
            backdrop-filter: blur(10px);
            text-align: center;
        }

        .country-flag {
            font-size: 2rem;
            margin-bottom: 10px;
        }

        .country-title {
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 15px;
        }

        .country-keywords {
            font-size: 1rem;
            margin-bottom: 15px;
            opacity: 0.9;
        }

        .country-archetype {
            font-size: 1.1rem;
            font-weight: 600;
            background: rgba(255,255,255,0.2);
            padding: 10px;
            border-radius: 8px;
        }

        .chart-section {
            margin-bottom: 50px;
        }

        .chart-title {
            font-size: 1.8rem;
            color: #2c3e50;
            margin-bottom: 30px;
            text-align: center;
            font-weight: 600;
        }

        .chart-container {
            background: #f8f9fa;
            padding: 30px;
            border-radius: 15px;
            margin-bottom: 30px;
        }

        .chart-wrapper {
            position: relative;
            height: 320px;
            margin-bottom: 30px;
        }

        .chart-bars {
            display: flex;
            justify-content: space-around;
            align-items: flex-end;
            height: 100%;
            padding: 20px 0;
        }

        .bar-group {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 200px;
        }

        .bars-set {
            display: flex;
            justify-content: center;
            align-items: flex-end;
            height: 220px;
            margin-bottom: 15px;
            gap: 8px;
        }

        .bar {
            width: 45px;
            border-radius: 6px 6px 0 0;
            position: relative;
            transition: all 0.3s ease;
        }

        .bar:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        }

        .bar-value {
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            font-weight: 600;
            font-size: 0.8rem;
            color: #2c3e50;
        }

        .korea { background: linear-gradient(to top, #e74c3c, #c0392b); }
        .usa { background: linear-gradient(to top, #3498db, #2980b9); }
        .europe { background: linear-gradient(to top, #2ecc71, #27ae60); }

        .x-axis-label {
            font-size: 0.9rem;
            color: #34495e;
            text-align: center;
            font-weight: 500;
            line-height: 1.3;
            max-width: 180px;
        }

        .legend {
            display: flex;
            justify-content: center;
            gap: 30px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }

        .legend-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 1rem;
            color: #34495e;
        }

        .legend-color {
            width: 20px;
            height: 20px;
            border-radius: 4px;
        }

        .analysis-section {
            background: #ecf0f1;
            padding: 30px;
            border-radius: 15px;
            margin-bottom: 30px;
        }

        .analysis-title {
            font-size: 1.6rem;
            color: #2c3e50;
            margin-bottom: 25px;
            font-weight: 600;
        }

        .question-analysis {
            margin-bottom: 30px;
            padding: 20px;
            background: white;
            border-radius: 10px;
            border-left: 5px solid #3498db;
        }

        .question-num {
            font-size: 1.3rem;
            font-weight: 600;
            color: #3498db;
            margin-bottom: 15px;
        }

        .country-insight {
            margin-bottom: 15px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
        }

        .country-insight strong {
            color: #2c3e50;
        }

        .ai-wants-section {
            background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);
            color: white;
            padding: 30px;
            border-radius: 15px;
            margin-bottom: 30px;
        }

        .ai-wants-title {
            font-size: 1.8rem;
            text-align: center;
            margin-bottom: 30px;
            font-weight: 600;
        }

        .ai-want-card {
            background: rgba(255,255,255,0.15);
            padding: 25px;
            border-radius: 12px;
            margin-bottom: 20px;
            backdrop-filter: blur(10px);
        }

        .conclusion {
            background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
            color: white;
            padding: 30px;
            border-radius: 15px;
        }

        .conclusion-title {
            font-size: 1.6rem;
            margin-bottom: 20px;
            font-weight: 600;
            text-align: center;
        }

        @media (max-width: 768px) {
            .chart-bars {
                flex-direction: column;
                gap: 30px;
                height: auto;
            }

            .bar-group {
                width: 100%;
            }

            .countries-grid {
                grid-template-columns: 1fr;
            }

            .legend {
                flex-direction: column;
                align-items: center;
                gap: 15px;
            }
        }
    </style>

</head>
<body>
    <div class="container">
        <div class="header">
            <h1>목회자 설교 준비 방식 국가별 비교 분석</h1>
            <p>한국 · 미국 · 유럽 목회자 1000명 대상 설문조사 예측 결과</p>
        </div>

        <div class="content">
            <!-- 핵심 키워드 섹션 -->
            <div class="keywords-section">
                <h2 class="keywords-title">한 눈에 보는 3개 대륙 목회자 핵심 키워드</h2>

                <div class="countries-grid">
                    <div class="country-card">
                        <div class="country-flag">🇰🇷</div>
                        <h3 class="country-title">대한민국</h3>
                        <div class="country-keywords">#영성 #깊이</div>
                        <div class="country-archetype">영성 중심 연구자<br>(The Spiritual Scholar)</div>
                    </div>

                    <div class="country-card">
                        <div class="country-flag">🇺🇸</div>
                        <h3 class="country-title">미국</h3>
                        <div class="country-keywords">#실용성 #공감</div>
                        <div class="country-archetype">실용적 소통가<br>(The Communicator)</div>
                    </div>

                    <div class="country-card">
                        <div class="country-flag">🇪🇺</div>
                        <h3 class="country-title">유럽</h3>
                        <div class="country-keywords">#신학적 성찰 #대화</div>
                        <div class="country-archetype">비판적 사상가<br>(The Critical Thinker)</div>
                    </div>
                </div>
            </div>

            <!-- 질문 1 차트 -->
            <div class="chart-section">
                <h2 class="chart-title">Q1. 설교 준비, 첫 단추는 어떻게 꿸까? (가장 먼저 하는 일)</h2>

                <div class="chart-container">
                    <div class="chart-wrapper">
                        <div class="chart-bars">
                            <div class="bar-group">
                                <div class="bars-set">
                                    <div class="bar korea" style="height: 135px;"><div class="bar-value">45%</div></div>
                                    <div class="bar usa" style="height: 75px;"><div class="bar-value">25%</div></div>
                                    <div class="bar europe" style="height: 60px;"><div class="bar-value">20%</div></div>
                                </div>
                                <div class="x-axis-label">기도와 묵상을 통한<br>영적 준비</div>
                            </div>

                            <div class="bar-group">
                                <div class="bars-set">
                                    <div class="bar korea" style="height: 105px;"><div class="bar-value">35%</div></div>
                                    <div class="bar usa" style="height: 120px;"><div class="bar-value">40%</div></div>
                                    <div class="bar europe" style="height: 150px;"><div class="bar-value">50%</div></div>
                                </div>
                                <div class="x-axis-label">성경 본문 읽기 및<br>주해 연구</div>
                            </div>

                            <div class="bar-group">
                                <div class="bars-set">
                                    <div class="bar korea" style="height: 45px;"><div class="bar-value">15%</div></div>
                                    <div class="bar usa" style="height: 75px;"><div class="bar-value">25%</div></div>
                                    <div class="bar europe" style="height: 75px;"><div class="bar-value">25%</div></div>
                                </div>
                                <div class="x-axis-label">설교 주제 및<br>방향성 설정</div>
                            </div>

                            <div class="bar-group">
                                <div class="bars-set">
                                    <div class="bar korea" style="height: 15px;"><div class="bar-value">5%</div></div>
                                    <div class="bar usa" style="height: 30px;"><div class="bar-value">10%</div></div>
                                    <div class="bar europe" style="height: 15px;"><div class="bar-value">5%</div></div>
                                </div>
                                <div class="x-axis-label">참고 자료 및<br>해석서 검토</div>
                            </div>
                        </div>
                    </div>

                    <div class="legend">
                        <div class="legend-item">
                            <div class="legend-color korea"></div>
                            <span>🇰🇷 한국</span>
                        </div>
                        <div class="legend-item">
                            <div class="legend-color usa"></div>
                            <span>🇺🇸 미국</span>
                        </div>
                        <div class="legend-item">
                            <div class="legend-color europe"></div>
                            <span>🇪🇺 유럽</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 질문 2 차트 -->
            <div class="chart-section">
                <h2 class="chart-title">Q2. 가장 많은 시간과 에너지를 쏟는 곳은? (시간 소모가 가장 큰 단계)</h2>

                <div class="chart-container">
                    <div class="chart-wrapper">
                        <div class="chart-bars">
                            <div class="bar-group">
                                <div class="bars-set">
                                    <div class="bar korea" style="height: 120px;"><div class="bar-value">40%</div></div>
                                    <div class="bar usa" style="height: 90px;"><div class="bar-value">30%</div></div>
                                    <div class="bar europe" style="height: 135px;"><div class="bar-value">45%</div></div>
                                </div>
                                <div class="x-axis-label">성경 본문 해석 및<br>주해 작업</div>
                            </div>

                            <div class="bar-group">
                                <div class="bars-set">
                                    <div class="bar korea" style="height: 90px;"><div class="bar-value">30%</div></div>
                                    <div class="bar usa" style="height: 120px;"><div class="bar-value">40%</div></div>
                                    <div class="bar europe" style="height: 75px;"><div class="bar-value">25%</div></div>
                                </div>
                                <div class="x-axis-label">적용점 도출 및<br>예화 수집</div>
                            </div>

                            <div class="bar-group">
                                <div class="bars-set">
                                    <div class="bar korea" style="height: 60px;"><div class="bar-value">20%</div></div>
                                    <div class="bar usa" style="height: 60px;"><div class="bar-value">20%</div></div>
                                    <div class="bar europe" style="height: 60px;"><div class="bar-value">20%</div></div>
                                </div>
                                <div class="x-axis-label">원고 작성 및<br>전달 방법 준비</div>
                            </div>

                            <div class="bar-group">
                                <div class="bars-set">
                                    <div class="bar korea" style="height: 30px;"><div class="bar-value">10%</div></div>
                                    <div class="bar usa" style="height: 30px;"><div class="bar-value">10%</div></div>
                                    <div class="bar europe" style="height: 30px;"><div class="bar-value">10%</div></div>
                                </div>
                                <div class="x-axis-label">설교 개요 및<br>구조 구성</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 질문 3 차트 -->
            <div class="chart-section">
                <h2 class="chart-title">Q3. AI, 나를 이렇게 도와다오! (AI에게 가장 바라는 역할)</h2>

                <div class="chart-container">
                    <div class="chart-wrapper">
                        <div class="chart-bars">
                            <div class="bar-group">
                                <div class="bars-set">
                                    <div class="bar korea" style="height: 105px;"><div class="bar-value">35%</div></div>
                                    <div class="bar usa" style="height: 30px;"><div class="bar-value">10%</div></div>
                                    <div class="bar europe" style="height: 120px;"><div class="bar-value">40%</div></div>
                                </div>
                                <div class="x-axis-label">성경 본문의 원어 분석<br>및 배경 연구</div>
                            </div>

                            <div class="bar-group">
                                <div class="bars-set">
                                    <div class="bar korea" style="height: 90px;"><div class="bar-value">30%</div></div>
                                    <div class="bar usa" style="height: 75px;"><div class="bar-value">25%</div></div>
                                    <div class="bar europe" style="height: 105px;"><div class="bar-value">35%</div></div>
                                </div>
                                <div class="x-axis-label">다양한 관점의<br>주해 자료 정리</div>
                            </div>

                            <div class="bar-group">
                                <div class="bars-set">
                                    <div class="bar korea" style="height: 75px;"><div class="bar-value">25%</div></div>
                                    <div class="bar usa" style="height: 105px;"><div class="bar-value">35%</div></div>
                                    <div class="bar europe" style="height: 45px;"><div class="bar-value">15%</div></div>
                                </div>
                                <div class="x-axis-label">현대적 적용을 위한<br>예화 및 사례 제안</div>
                            </div>

                            <div class="bar-group">
                                <div class="bars-set">
                                    <div class="bar korea" style="height: 30px;"><div class="bar-value">10%</div></div>
                                    <div class="bar usa" style="height: 90px;"><div class="bar-value">30%</div></div>
                                    <div class="bar europe" style="height: 30px;"><div class="bar-value">10%</div></div>
                                </div>
                                <div class="x-axis-label">설교 개요 및<br>논리적 구성 지원</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 분석 섹션 -->
            <div class="analysis-section">
                <h2 class="analysis-title">세부 분석 결과</h2>

                <div class="question-analysis">
                    <div class="question-num">Q1 분석: 설교 준비의 첫 단추</div>
                    <div class="country-insight">
                        <strong>🇰🇷 대한민국:</strong> 1순위: 기도와 묵상 🙏 (영적 준비 우선)
                    </div>
                    <div class="country-insight">
                        <strong>🇺🇸 미국:</strong> 1순위: 성경 본문 읽기 📖 (메시지 핵심 파악 우선)
                    </div>
                    <div class="country-insight">
                        <strong>🇪🇺 유럽:</strong> 1순위: 성경 본문 읽기 🏛️ (학문적/신학적 분석 우선)
                    </div>
                </div>

                <div class="question-analysis">
                    <div class="question-num">Q2 분석: 시간과 에너지 집중 영역</div>
                    <div class="country-insight">
                        <strong>🇰🇷 대한민국 & 🇪🇺 유럽:</strong> 압도적 1위: 성경 본문 해석 및 주해 작업<br>
                        • 이유 (한국): 본문의 '바른 의미'를 탐구하는 데 신학적 무게를 둠<br>
                        • 이유 (유럽): 본문을 철학, 역사, 사회적 맥락에서 깊이 있게 성찰
                    </div>
                    <div class="country-insight">
                        <strong>🇺🇸 미국:</strong> 압도적 1위: 적용점 도출 및 예화 수집<br>
                        • 이유: 청중의 삶을 변화시키는 '실용적 메시지'와 '공감'을 찾는 데 집중
                    </div>
                </div>
            </div>

            <!-- AI 지원 요구사항 -->
            <div class="ai-wants-section">
                <h2 class="ai-wants-title">Q3 심화 분석: 각국 목회자가 AI에게 바라는 역할</h2>
                <p style="text-align: center; margin-bottom: 30px; font-size: 1.1rem;">세 지역 목회자 모두 <strong>자신의 가장 큰 고민을 해결해 줄 AI 파트너</strong>를 원했습니다.</p>

                <div class="ai-want-card">
                    <h3 style="margin-bottom: 15px;">🇰🇷 대한민국 목회자</h3>
                    <h4 style="margin-bottom: 10px;">"나의 '깊이 있는 연구 조교'가 되어줘"</h4>
                    <p><strong>Wants:</strong> 방대한 원어, 배경, 주석 자료를 빠르게 분석하고 정리하는 능력</p>
                    <p><strong>키워드:</strong> #리서치 #자료분석 #학문적깊이</p>
                </div>

                <div class="ai-want-card">
                    <h3 style="margin-bottom: 15px;">🇺🇸 미국 목회자</h3>
                    <h4 style="margin-bottom: 10px;">"나의 '창의적인 아이디어 파트너'가 되어줘"</h4>
                    <p><strong>Wants:</strong> 현대적이고 공감 가는 예화, 통계, 미디어 자료를 제안하는 능력</p>
                    <p><strong>키워드:</strong> #아이디어 #예화 #트렌드 #적용</p>
                </div>

                <div class="ai-want-card">
                    <h3 style="margin-bottom: 15px;">🇪🇺 유럽 목회자</h3>
                    <h4 style="margin-bottom: 10px;">"나의 '지적인 대화 분석가'가 되어줘"</h4>
                    <p><strong>Wants:</strong> 다양한 철학, 신학적 관점을 비교 분석하고 사회적 담론을 제시하는 능력</p>
                    <p><strong>키워드:</strong> #관점비교 #담론분석 #지적대화</p>
                </div>
            </div>

            <!-- 결론 -->
            <div class="conclusion">
                <h2 class="conclusion-title">결론: 컨텍스트가 스타일을 만든다 (Context Shapes the Style)</h2>
                <p>목회자들이 처한 <strong>목회적 상황과 문화적 토양</strong>이 설교 준비 스타일과 AI에 대한 기대를 결정합니다. 결국 AI 기술은 각기 다른 목회 현장의 필요에 맞춰 <strong>가장 적합한 '보조 두뇌'의 역할</strong>을 수행해야 할 것입니다.</p>
            </div>
        </div>
    </div>

</body>
</html>
