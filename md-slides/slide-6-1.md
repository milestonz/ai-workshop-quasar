@html

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>보완된 연간 목회계획 절차</title>
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
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(90deg, #4f46e5, #7c3aed);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .header p {
            font-size: 1.1rem;
            opacity: 0.9;
        }
        
        .timeline {
            padding: 40px;
            position: relative;
        }
        
        .timeline::before {
            content: '';
            position: absolute;
            left: 50%;
            top: 0;
            bottom: 0;
            width: 4px;
            background: linear-gradient(to bottom, #4f46e5, #7c3aed);
            transform: translateX(-50%);
        }
        
        .phase {
            margin-bottom: 60px;
            position: relative;
        }
        
        .phase-content {
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            border: 2px solid #e5e7eb;
            width: 45%;
            position: relative;
        }
        
        .phase:nth-child(odd) .phase-content {
            margin-left: 55%;
        }
        
        .phase:nth-child(even) .phase-content {
            margin-right: 55%;
        }
        
        .phase-number {
            position: absolute;
            left: 50%;
            top: 20px;
            transform: translateX(-50%);
            width: 60px;
            height: 60px;
            background: linear-gradient(45deg, #4f46e5, #7c3aed);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 1.5rem;
            box-shadow: 0 5px 15px rgba(79, 70, 229, 0.4);
            z-index: 2;
        }
        
        .phase-title {
            font-size: 1.5rem;
            color: #1f2937;
            margin-bottom: 15px;
            font-weight: 600;
        }
        
        .phase-period {
            color: #7c3aed;
            font-weight: 600;
            margin-bottom: 20px;
            font-size: 1.1rem;
        }
        
        .activity-list {
            color: #4b5563;
            line-height: 1.8;
            font-size: 0.95rem;
        }
        
        .improvements {
            background: #f0f9ff;
            border: 2px solid #0ea5e9;
            border-radius: 10px;
            padding: 15px;
            margin-top: 15px;
        }
        
        .improvements-title {
            color: #0369a1;
            font-weight: 600;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
        }
        
        .improvements-title::before {
            content: "✨";
            margin-right: 8px;
        }
        
        .improvements-list {
            color: #0c4a6e;
            font-size: 0.9rem;
            line-height: 1.5;
        }
        
        .key-areas {
            background: #f8fafc;
            padding: 40px;
            border-top: 1px solid #e5e7eb;
        }
        
        .key-areas h2 {
            text-align: center;
            color: #1f2937;
            font-size: 2rem;
            margin-bottom: 30px;
        }
        
        .areas-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }
        
        .area-card {
            background: white;
            border-radius: 15px;
            padding: 25px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
            border-left: 5px solid #4f46e5;
            transition: transform 0.3s ease;
        }
        
        .area-card:hover {
            transform: translateY(-5px);
        }
        
        .area-title {
            color: #4f46e5;
            font-weight: 600;
            margin-bottom: 10px;
            font-size: 1.1rem;
        }
        
        .area-description {
            color: #6b7280;
            line-height: 1.5;
            font-size: 0.9rem;
        }
        
        .new-badge {
            background: #ef4444;
            color: white;
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 0.7rem;
            font-weight: 600;
            margin-left: 8px;
        }
        
        @media (max-width: 768px) {
            .timeline::before {
                left: 30px;
            }
            
            .phase-content {
                width: calc(100% - 80px);
                margin-left: 80px !important;
                margin-right: 0 !important;
            }
            
            .phase-number {
                left: 30px;
            }
            
            .header h1 {
                font-size: 2rem;
            }
            
            .timeline {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>연간 목회계획 절차</h1>
            <p>체계적이고 포괄적인 목회 계획 수립을 위한 단계별 가이드</p>
        </div>
        
        <div class="timeline">
            <div class="phase">
                <div class="phase-number">1</div>
                <div class="phase-content">
                    <div class="phase-title">비전 수립 (Vision Establishment)</div>
                    <div class="phase-period">전년도 9-10월</div>
                    <div class="phase-description">
                        <div class="activity-list">
                            • 복음과 하나님 나라에 관한 신앙고백 수립<br>
                            • 교회의 조직체와 유기적 역동성에 대한 목회신학적 이해 정립<br>
                            • 교회 주변 문화적 환경과 상황 분석<br>
                            • 3-5년 장기 비전 설정 및 목적 지향점 명시<br>
                            • 개인구원과 사회구원의 조화 방안 모색
                        </div>
                    </div>
                    <div class="improvements">
                        <div class="improvements-title">기독교대한감리회 방식 보완 사항</div>
                        <div class="improvements-list">
                            • 당회 중심의 교회 의사결정 체계 강화<br>
                            • 속회 운영을 통한 교인 개별 돌봄 체계 구축<br>
                            • 연회 및 지방회와의 연결적 관계 활용<br>
                            • 감리교 3대 원칙(진정한 기독교회, 감리교회, 조선적 교회) 반영
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="phase">
                <div class="phase-number">2</div>
                <div class="phase-content">
                    <div class="phase-title">조직 구성 및 역할 분담 (Organization & Role Assignment) <span class="new-badge">기감</span></div>
                    <div class="phase-period">전년도 10-11월</div>
                    <div class="phase-description">
                        <div class="activity-list">
                            • 당회 임원진 구성 (장로, 권사, 집사, 각 부서장)<br>
                            • 5대 부서 조직: 선교부, 교육부, 사회봉사부, 재무부, 관리부<br>
                            • 속회 조직 및 속장 배정으로 소그룹 목양 체계 구축<br>
                            • 기획위원회 구성 (담임자, 연회원, 장로 7인 이상)<br>
                            • 남녀선교회, 청장년선교회, 청년회 등 자치단체 조직<br>
                            • 감사 선출 및 재정 투명성 체계 구축<br>
                            • 교회학교 조직 및 교육체계 정비<br>
                            • 연회 및 지방회 대표 선정
                        </div>
                    </div>
                    <div class="improvements">
                        <div class="improvements-title">기독교대한감리회 방식 핵심 특징</div>
                        <div class="improvements-list">
                            • 감독제 하에서의 연결적 교회 조직 체계<br>
                            • 속회 중심의 소그룹 목양과 개인구원과 사회구원의 조화<br>
                            • 웨슬리의 정신에 충실한 감리교 전통 계승<br>
                            • 교육과 사회복지, 전도와 선교의 균형적 발전
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="phase">
                <div class="phase-number">7</div>
                <div class="phase-content">
                    <div class="phase-title">현황 분석 및 평가 (Analysis & Evaluation)</div>
                    <div class="phase-period">전년도 11월</div>
                    <div class="phase-description">
                        <div class="activity-list">
                            • 전년도 목적 대비 실행 결과 비교 분석<br>
                            • 계획 차질 부분의 원인 분석 및 교훈 도출<br>
                            • 성과와 한계점의 객관적 평가<br>
                            • 교인 현황 및 구성 변화 분석<br>
                            • 조직 및 시설 현황 점검<br>
                            • 재정 상황 및 건전성 평가<br>
                            • 지역사회와의 관계 및 영향력 측정
                        </div>
                    </div>
                    <div class="improvements">
                        <div class="improvements-title">기독교대한감리회 방식 보완 사항</div>
                        <div class="improvements-list">
                            • 당회 중심의 현황 분석 및 평가 체계<br>
                            • 5대 부서별 전년도 사역 성과 종합 평가<br>
                            • 속회 운영 현황 및 개별 교인 신앙성장 평가<br>
                            • 연회 및 지방회 목표 달성도 분석
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="phase">
                <div class="phase-number">3</div>
                <div class="phase-content">
                    <div class="phase-title">전략 기획 (Strategic Planning)</div>
                    <div class="phase-period">전년도 12월</div>
                    <div class="phase-description">
                        <div class="activity-list">
                            • 기독교대한감리회 3대 원칙 기반 전략 수립<br>
                            &nbsp;&nbsp;- 진정한 기독교회: 전도, 교육, 사회봉사의 균형적 전개<br>
                            &nbsp;&nbsp;- 진정한 감리교회: 웨슬리 정신과 에큐메니칼 정신 구현<br>
                            &nbsp;&nbsp;- 조선적 교회: 한국 고유의 토착적 전통 반영<br>
                            • 교회력과 주요 절기를 고려한 연간 일정 계획<br>
                            • 개인구원과 사회구원의 조화를 위한 통합적 사역 설계<br>
                            • 5대 부서별 핵심 사역 전략 설정<br>
                            &nbsp;&nbsp;- 선교부: 전도와 해외선교, 국내선교 활동<br>
                            &nbsp;&nbsp;- 교육부: 신앙교육과 제자훈련, 평신도 교육<br>
                            &nbsp;&nbsp;- 사회봉사부: 지역사회 섬김과 사회정의 실현<br>
                            &nbsp;&nbsp;- 재무부: 청지기 정신에 바탕한 재정 관리<br>
                            &nbsp;&nbsp;- 관리부: 교회 시설과 운영 전반 관리
                        </div>
                    </div>
                    <div class="improvements">
                        <div class="improvements-title">보완 사항</div>
                        <div class="improvements-list">
                            • 위기 대응 전략 수립<br>
                            • 협력 네트워크 활용 계획<br>
                            • 환경 친화적 교회 운영 방안
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="phase">
                <div class="phase-number">4</div>
                <div class="phase-content">
                    <div class="phase-title">세부 계획 수립 (Detailed Planning)</div>
                    <div class="phase-period">당해년도 1월</div>
                    <div class="phase-description">
                        <div class="activity-list">
                            • 월별/분기별 세부 실행 계획 수립<br>
                            • 각 사역별 구체적 목표 및 성과지표 설정<br>
                            • 실행 방법과 절차 매뉴얼 작성<br>
                            • 사역별 담당자 및 협력자 배정<br>
                            • 필요 자원과 예산 할당 계획<br>
                            • 평가 기준과 측정 방법 명시<br>
                            • 연간/월간/주간 시간표 작성<br>
                            • 주요 행사 및 절기 일정 확정
                        </div>
                    </div>
                    <div class="improvements">
                        <div class="improvements-title">기독교대한감리회 방식 보완 사항</div>
                        <div class="improvements-list">
                            • 당회 임원회와 기획위원회 연계 계획 수립<br>
                            • 속회 단위 세부 실행 계획 및 개별 목양 계획<br>
                            • 연회 및 지방회 사업과의 연계성 확보<br>
                            • 감리교 전통에 근거한 영성 훈련 프로그램 개발
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="phase">
                <div class="phase-number">5</div>
                <div class="phase-content">
                    <div class="phase-title">승인 및 공유 (Approval & Sharing)</div>
                    <div class="phase-period">당해년도 1-2월</div>
                    <div class="phase-description">
                        <div class="activity-list">
                            • 정책당회를 통한 목회계획 제시 및 검토<br>
                            • 장로진과의 심층 토의 및 계획 조정<br>
                            • 당회 결의를 통한 최종 승인 절차<br>
                            • 비전 공유를 위한 설교 시리즈 기획<br>
                            • 평신도 리더들과의 개별 면담 실시<br>
                            • 각 기관별 설명회 및 간담회 개최<br>
                            • 교회 소식지 및 홈페이지 홍보 컨텐츠 제작<br>
                            • 교인들의 참여 동기 부여 및 역할 분담
                        </div>
                    </div>
                    <div class="improvements">
                        <div class="improvements-title">기독교대한감리회 방식 보완 사항</div>
                        <div class="improvements-list">
                            • 당회 의결을 통한 최종 승인 및 정당성 확보<br>
                            • 구역회 보고 및 연회 승인 체계 연계<br>
                            • 속회 단위 비전 공유 및 개별 교인 참여 독려<br>
                            • 감리교 기관지와 연회 소식지 활용 홍보
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="phase">
                <div class="phase-number">6</div>
                <div class="phase-content">
                    <div class="phase-title">실행 및 모니터링 (Implementation & Monitoring) <span class="new-badge">강화</span></div>
                    <div class="phase-period">연중</div>
                    <div class="phase-description">
                        <div class="activity-list">
                            • 분기별 실행 현황 점검 및 성과 측정<br>
                            • 목표 대비 진척도 분석 및 편차 원인 파악<br>
                            • 필요시 계획 수정 및 전략 조정<br>
                            • 정량적 평가 (참석자 수, 예산 집행률, 목표 달성률)<br>
                            • 정성적 평가 (영적 성장, 공동체 화합, 지역사회 기여도)<br>
                            • 성공 사례 발굴 및 확산 방안 모색<br>
                            • 실패 요인 분석 및 개선책 마련<br>
                            • 차년도 계획 수립을 위한 교훈 도출<br>
                            • 지속성 확보를 위한 시스템 점검
                        </div>
                    </div>
                    <div class="improvements">
                        <div class="improvements-title">보완 사항</div>
                        <div class="improvements-list">
                            • 실시간 데이터 기반 의사결정<br>
                            • 위기 상황 대응 매뉴얼 활용<br>
                            • 지속적 학습 및 개선 체계
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="key-areas">
            <h2>새롭게 보완된 주요 사역 영역</h2>
            <div class="areas-grid">
                <div class="area-card">
                    <div class="area-title">디지털 목회 <span class="new-badge">NEW</span></div>
                    <div class="area-description">온라인 예배, 디지털 목양, 소셜미디어 전도, 가상현실 성경교육 등 디지털 시대에 맞는 새로운 목회 방식을 도입합니다.</div>
                </div>
                
                <div class="area-card">
                    <div class="area-title">세대별 맞춤 사역 <span class="new-badge">확장</span></div>
                    <div class="area-description">베이비부머, X세대, 밀레니얼, Z세대 등 각 세대의 특성과 필요에 맞는 차별화된 사역 프로그램을 개발합니다.</div>
                </div>
                
                <div class="area-card">
                    <div class="area-title">정신건강 & 웰빙 사역 <span class="new-badge">NEW</span></div>
                    <div class="area-description">현대인의 스트레스, 우울감, 불안장애 등에 대응하는 전문적인 상담과 치유 프로그램을 운영합니다.</div>
                </div>
                
                <div class="area-card">
                    <div class="area-title">지속가능한 교회 운영 <span class="new-badge">NEW</span></div>
                    <div class="area-description">환경 보호, 사회적 책임, 재정 투명성을 바탕으로 미래 세대를 위한 지속가능한 교회 공동체를 구축합니다.</div>
                </div>
                
                <div class="area-card">
                    <div class="area-title">위기 대응 체계 <span class="new-badge">NEW</span></div>
                    <div class="area-description">자연재해, 팬데믹, 사회적 갈등 등 예상치 못한 위기 상황에 신속하고 효과적으로 대응할 수 있는 시스템을 구축합니다.</div>
                </div>
                
                <div class="area-card">
                    <div class="area-title">협력 네트워크 강화 <span class="new-badge">확장</span></div>
                    <div class="area-description">지역교회, 교단, 지역사회, NGO와의 전략적 파트너십을 통해 더 큰 사회적 영향력을 발휘합니다.</div>
                </div>
                
                <div class="area-card">
                    <div class="area-title">역량 개발 체계 <span class="new-badge">강화</span></div>
                    <div class="area-description">목회자와 평신도 리더들의 지속적인 성장을 위한 체계적인 교육과 훈련 프로그램을 정례화합니다.</div>
                </div>
                
                <div class="area-card">
                    <div class="area-title">데이터 기반 의사결정 <span class="new-badge">NEW</span></div>
                    <div class="area-description">교회 운영과 사역 성과에 대한 체계적인 데이터 수집과 분석을 통해 더욱 효과적인 목회 전략을 수립합니다.</div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
