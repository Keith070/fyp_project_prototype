
/**
 * Blockchain Voting System - Main Script
 * Contains all functionality for all pages
 */

document.addEventListener('DOMContentLoaded', function() {
    // ==================== COMMON FUNCTIONALITY ====================
    
    // Mobile menu toggle for all pages
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.setAttribute('aria-expanded', mainNav.classList.contains('active'));
        });
    }

    // Logout function
    window.logout = function() {
        console.log('User logged out');
        // Clear session data
        sessionStorage.clear();
        // Redirect to login
        window.location.href = 'index.html';
    };

    // ==================== DASHBOARD PAGE ====================
    if (document.querySelector('.dashboard-container')) {
        // Simulate live data updates
        setInterval(() => {
            const cards = document.querySelectorAll('.dashboard-card');
            cards.forEach(card => {
                card.style.transform = 'translateY(0)';
                setTimeout(() => {
                    card.style.transform = 'translateY(-5px)';
                }, 100);
            });
        }, 5000);
    }

    // ==================== VOTE PAGE ====================
    if (document.getElementById('voteForm')) {
        const voteForm = document.getElementById('voteForm');
        const candidateOptions = document.querySelectorAll('.candidate-option');
        
        // Enhanced candidate selection
        candidateOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                // Don't trigger if clicking directly on the radio input
                if (e.target.tagName !== 'INPUT') {
                    const radio = this.querySelector('input[type="radio"]');
                    radio.checked = true;
                    
                    // Update visual selection state
                    candidateOptions.forEach(opt => {
                        opt.querySelector('.candidate-card').classList.remove('selected');
                    });
                    this.querySelector('.candidate-card').classList.add('selected');
                }
            });
        });

        // Form submission
        voteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const selectedCandidate = document.querySelector('input[name="candidate"]:checked');
            
            if (!selectedCandidate) {
                alert('Please select a candidate before submitting your vote.');
                return;
            }
            
            // Simulate blockchain transaction
            showLoadingOverlay('Recording your vote on the blockchain...');
            
            setTimeout(() => {
                hideLoadingOverlay();
                
                // Generate a fake transaction hash for demonstration
                const txHash = generateBlockchainTxHash();
                
                // Show success modal with verification info
                showVoteReceipt(selectedCandidate.value, txHash);
                
                console.log(`Vote recorded for ${selectedCandidate.value}`);
            }, 2000);
        });
    }

    // ==================== RESULTS PAGE ====================
    if (document.querySelector('.results-container')) {
        // Live results updates
        setInterval(updateLiveResults, 3000);
        
        // Constituency selector
        const constituencySelect = document.getElementById('constituencySelect');
        if (constituencySelect) {
            constituencySelect.addEventListener('change', function() {
                if (this.value) {
                    loadConstituencyResults(this.value);
                } else {
                    document.getElementById('constituencyDetails').innerHTML = 
                        '<p>Select a constituency to view detailed results</p>';
                }
            });
        }
        
        // Verify vote functionality
        const verifyBtn = document.querySelector('.verify-btn');
        if (verifyBtn) {
            verifyBtn.addEventListener('click', function() {
                const voterId = document.querySelector('.verify-form input').value;
                if (voterId.trim()) {
                    verifyVoteOnBlockchain(voterId);
                } else {
                    alert('Please enter your Voter ID');
                }
            });
        }
    }

    // ==================== SECURITY PAGE ====================
    if (document.querySelector('.security-container')) {
        // Animate feature cards on scroll
        const featureCards = document.querySelectorAll('.feature-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        featureCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(card);
        });
    }

    // ==================== FAQ PAGE ====================
    if (document.querySelector('.faq-accordion')) {
        // FAQ accordion functionality
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const answer = this.nextElementSibling;
                const isOpen = answer.classList.contains('show');
                
                // Close all other answers
                document.querySelectorAll('.faq-answer').forEach(ans => {
                    if (ans !== answer) {
                        ans.classList.remove('show');
                        ans.previousElementSibling.classList.remove('active');
                    }
                });
                
                // Toggle current answer
                if (isOpen) {
                    answer.classList.remove('show');
                    this.classList.remove('active');
                } else {
                    answer.classList.add('show');
                    this.classList.add('active');
                }
            });
        });
        
        // FAQ search functionality
        const searchInput = document.querySelector('.search-faq input');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                
                document.querySelectorAll('.faq-item').forEach(item => {
                    const question = item.querySelector('.faq-question span').textContent.toLowerCase();
                    const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
                    
                    if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        }
        
        // FAQ category filtering
        const categoryBtns = document.querySelectorAll('.category-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // For demo purposes
                categoryBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Scroll to first FAQ item
                document.querySelector('.faq-item')?.scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }
});

// ==================== HELPER FUNCTIONS ====================

/**
 * Shows a loading overlay during blockchain operations
 */
function showLoadingOverlay(message) {
    let overlay = document.getElementById('blockchain-loading-overlay');
    
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'blockchain-loading-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        overlay.style.display = 'flex';
        overlay.style.flexDirection = 'column';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = '9999';
        overlay.style.color = 'white';
        
        const spinner = document.createElement('div');
        spinner.className = 'blockchain-spinner';
        spinner.style.border = '5px solid #f3f3f3';
        spinner.style.borderTop = '5px solid #169B62';
        spinner.style.borderRadius = '50%';
        spinner.style.width = '50px';
        spinner.style.height = '50px';
        spinner.style.animation = 'spin 1s linear infinite';
        
        const text = document.createElement('p');
        text.textContent = message || 'Processing blockchain transaction...';
        text.style.marginTop = '20px';
        text.style.fontSize = '1.2rem';
        
        overlay.appendChild(spinner);
        overlay.appendChild(text);
        document.body.appendChild(overlay);
        
        // Add spin animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Hides the loading overlay
 */
function hideLoadingOverlay() {
    const overlay = document.getElementById('blockchain-loading-overlay');
    if (overlay) {
        overlay.remove();
    }
}

/**
 * Generates a fake blockchain transaction hash for demo purposes
 */
function generateBlockchainTxHash() {
    const chars = '0123456789abcdef';
    let hash = '0x';
    for (let i = 0; i < 64; i++) {
        hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash;
}

/**
 * Shows a vote receipt modal after successful voting
 */
function showVoteReceipt(candidate, txHash) {
    const modal = document.createElement('div');
    modal.className = 'vote-receipt-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '10000';
    
    const content = document.createElement('div');
    content.className = 'receipt-content';
    content.style.backgroundColor = 'white';
    content.style.padding = '2rem';
    content.style.borderRadius = '8px';
    content.style.maxWidth = '500px';
    content.style.width = '90%';
    content.style.textAlign = 'center';
    
    const icon = document.createElement('i');
    icon.className = 'fas fa-check-circle';
    icon.style.color = '#169B62';
    icon.style.fontSize = '4rem';
    icon.style.marginBottom = '1rem';
    
    const heading = document.createElement('h3');
    heading.textContent = 'Vote Successfully Recorded!';
    heading.style.color = '#169B62';
    heading.style.marginBottom = '1rem';
    
    const candidateText = document.createElement('p');
    candidateText.textContent = `You voted for: ${candidate}`;
    candidateText.style.fontWeight = 'bold';
    candidateText.style.marginBottom = '1rem';
    
    const txText = document.createElement('p');
    txText.textContent = 'Transaction Hash:';
    txText.style.marginBottom = '0.5rem';
    
    const txHashElement = document.createElement('div');
    txHashElement.textContent = txHash;
    txHashElement.style.fontFamily = 'monospace';
    txHashElement.style.backgroundColor = '#f5f5f5';
    txHashElement.style.padding = '0.5rem';
    txHashElement.style.borderRadius = '4px';
    txHashElement.style.wordBreak = 'break-all';
    txHashElement.style.marginBottom = '1.5rem';
    
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.style.backgroundColor = '#169B62';
    closeBtn.style.color = 'white';
    closeBtn.style.border = 'none';
    closeBtn.style.padding = '0.75rem 1.5rem';
    closeBtn.style.borderRadius = '4px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.fontSize = '1rem';
    
    closeBtn.addEventListener('click', function() {
        modal.remove();
    });
    
    content.appendChild(icon);
    content.appendChild(heading);
    content.appendChild(candidateText);
    content.appendChild(txText);
    content.appendChild(txHashElement);
    content.appendChild(closeBtn);
    modal.appendChild(content);
    
    document.body.appendChild(modal);
}

/**
 * Updates live results on results page
 */
function updateLiveResults() {
    const bars = document.querySelectorAll('.result-bar');
    const timestamp = document.getElementById('updateTimestamp');
    
    if (bars.length) {
        bars.forEach(bar => {
            const currentWidth = parseInt(bar.style.width);
            const change = (Math.random() * 2) - 1; // Random change between -1 and 1
            const newWidth = Math.max(5, Math.min(95, currentWidth + change));
            
            bar.style.width = `${newWidth}%`;
            bar.querySelector('span').textContent = `${Math.round(newWidth)}% (${Math.round(newWidth * 12456.78)} votes)`;
        });
    }
    
    if (timestamp) {
        const now = new Date();
        timestamp.textContent = now.toLocaleTimeString();
    }
}

/**
 * Loads constituency results (simulated)
 */
function loadConstituencyResults(constituencyId) {
    const detailsDiv = document.getElementById('constituencyDetails');
    
    // Simulate loading
    detailsDiv.innerHTML = '<p>Loading results...</p>';
    
    // Simulate API call
    setTimeout(() => {
        // Mock data
        const mockData = {
            'dublin-central': {
                name: 'Dublin Central',
                turnout: '72%',
                leading: 'Mary O\'Connor (Green Party)',
                results: [
                    { candidate: 'Jerry Hutch', party: 'Green Party', votes: '45%' },
                    { candidate: 'Jimmy Sloyan', party: 'Fine Gael', votes: '30%' },
                    { candidate: 'Enoch Burke', party: 'Sinn Féin', votes: '25%' }
                ]
            },
            'cork-north-west': {
                name: 'Cork North-West',
                turnout: '68%',
                leading: 'John Murphy (Fine Gael)',
                results: [
                    { candidate: 'Jimmy Sloyan', party: 'Fine Gael', votes: '48%' },
                    { candidate: 'Jerry Hutch', party: 'Green Party', votes: '35%' },
                    { candidate: 'Enoch Burke', party: 'Sinn Féin', votes: '17%' }
                ]
            },
            'galway-east': {
                name: 'Galway East',
                turnout: '65%',
                leading: 'Sarah Ryan (Sinn Féin)',
                results: [
                    { candidate: 'Enoch Burke', party: 'Sinn Féin', votes: '42%' },
                    { candidate: 'Jimmy Sloyan', party: 'Fine Gael', votes: '40%' },
                    { candidate: 'Jerry Hutch', party: 'Green Party', votes: '18%' }
                ]
            }
        };
        
        const data = mockData[constituencyId] || {
            name: 'Unknown Constituency',
            turnout: '0%',
            leading: 'None',
            results: []
        };
        
        // Build results HTML
        let html = `
            <h4>${data.name} Results</h4>
            <p><strong>Turnout:</strong> ${data.turnout}</p>
            <p><strong>Current Leader:</strong> ${data.leading}</p>
            <div class="constituency-results-chart">
                <h5>Detailed Results:</h5>
        `;
        
        data.results.forEach(result => {
            html += `
                <div class="constituency-result-row">
                    <span class="candidate-name">${result.candidate}</span>
                    <span class="candidate-party">${result.party}</span>
                    <span class="candidate-votes">${result.votes}</span>
                </div>
            `;
        });
        
        html += `</div>`;
        detailsDiv.innerHTML = html;
    }, 800);
}

/**
 * Simulates blockchain vote verification
 */
function verifyVoteOnBlockchain(voterId) {
    showLoadingOverlay('Verifying vote on blockchain...');
    
    // Simulate blockchain lookup
    setTimeout(() => {
        hideLoadingOverlay();
        
        // Mock response - in a real app this would come from your blockchain API
        const isVerified = Math.random() > 0.2; // 80% chance of verification for demo
        
        if (isVerified) {
            alert('Verification successful! Your vote was recorded on the blockchain.');
        } else {
            alert('Could not verify your vote. Please ensure you entered the correct Voter ID.');
        }
    }, 1500);
}