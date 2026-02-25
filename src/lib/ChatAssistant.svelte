<script>
  import { searchKnowledge, suggestedQuestions } from './data/chatKnowledge.js';

  let isOpen = $state(false);
  let inputText = $state('');
  let messages = $state([]);
  let messagesEl = $state(null);
  let inputEl = $state(null);
  let isTyping = $state(false);

  function toggle() {
    isOpen = !isOpen;
    if (isOpen) {
      // Auto-focus input when opening
      setTimeout(() => inputEl?.focus(), 150);
    }
  }

  function scrollToBottom() {
    setTimeout(() => {
      if (messagesEl) {
        messagesEl.scrollTop = messagesEl.scrollHeight;
      }
    }, 20);
  }

  function formatAnswer(text) {
    let html = text;

    // Bold: **text** → <strong>
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Horizontal rule: --- on its own line
    html = html.replace(/\n---\n/g, '<hr>');

    // Bullet lists: lines starting with "- "
    html = html.replace(/((?:^|\n)- .+(?:\n- .+)*)/g, (match) => {
      const items = match.trim().split('\n').map(line =>
        `<li>${line.replace(/^- /, '')}</li>`
      ).join('');
      return `<ul>${items}</ul>`;
    });

    // Double newlines → paragraph breaks
    html = html.replace(/\n\n/g, '</p><p>');
    html = `<p>${html}</p>`;

    // Single newlines within paragraphs → <br>
    html = html.replace(/\n/g, '<br>');

    // Clean up empty paragraphs
    html = html.replace(/<p>\s*<\/p>/g, '');

    return html;
  }

  function submitQuery(text) {
    const query = text.trim();
    if (!query) return;

    // Add user message
    messages = [...messages, {
      role: 'user',
      text: query,
      timestamp: Date.now(),
    }];
    inputText = '';
    isTyping = true;
    scrollToBottom();

    // Simulate typing delay then respond
    setTimeout(() => {
      const results = searchKnowledge(query);

      let botText;
      let related = [];

      if (results.length === 0) {
        botText = `I couldn't find a specific answer for that. Try asking about:\n\n- **Poker terms** (GTO, equity, c-bet, SPR, MDF)\n- **Preflop ranges** (opening ranges, 3-bet, position)\n- **Postflop strategy** (c-bet, turn, river, board texture)\n- **Bet sizing** (pot odds, stack depth, SPR)\n- **Hand equity** (matchups, outs, draws)\n- **Multiway pots** (adjustments, bluffing)`;
      } else {
        botText = results[0].answer;
        if (results.length > 1) {
          related = results.slice(1).map(r => r.question);
        }
      }

      messages = [...messages, {
        role: 'bot',
        text: botText,
        related,
        timestamp: Date.now(),
      }];
      isTyping = false;
      scrollToBottom();
    }, 300);
  }

  function handleKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submitQuery(inputText);
    }
  }

  function clearMessages() {
    messages = [];
  }

  function handleRelated(question) {
    submitQuery(question);
  }
</script>

<!-- Toggle tab -->
<button
  class="chat-tab"
  class:open={isOpen}
  onclick={toggle}
  aria-label={isOpen ? 'Close assistant' : 'Open poker assistant'}
>
  <span class="tab-icon">&#9824;</span>
  <span class="tab-text">{isOpen ? '' : 'Ask AI'}</span>
</button>

<!-- Chat panel -->
{#if isOpen}
  <div class="chat-panel" role="complementary" aria-label="GTO Assistant">
    <!-- Header -->
    <div class="chat-header">
      <div class="header-info">
        <div class="header-title">GTO Assistant</div>
        <div class="header-subtitle">Ask about poker strategy</div>
      </div>
      <div class="header-actions">
        {#if messages.length > 0}
          <button class="header-btn" onclick={clearMessages} title="Clear chat">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12M5.33 4V2.67a1.33 1.33 0 011.34-1.34h2.66a1.33 1.33 0 011.34 1.34V4m2 0v9.33a1.33 1.33 0 01-1.34 1.34H4.67a1.33 1.33 0 01-1.34-1.34V4h9.34z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        {/if}
        <button class="header-btn" onclick={toggle} title="Close">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Messages area -->
    <div class="chat-messages" bind:this={messagesEl}>
      {#if messages.length === 0}
        <div class="empty-state">
          <div class="empty-icon">&#9824;</div>
          <div class="empty-title">How can I help?</div>
          <div class="empty-subtitle">Ask about poker terms, strategy, equity, ranges, and GTO concepts.</div>
          <div class="suggestions">
            {#each suggestedQuestions as q}
              <button class="suggestion-btn" onclick={() => submitQuery(q)}>
                {q}
              </button>
            {/each}
          </div>
        </div>
      {:else}
        {#each messages as msg}
          <div class="message-row {msg.role}">
            {#if msg.role === 'bot'}
              <div class="avatar">&#9824;</div>
            {/if}
            <div class="bubble {msg.role}">
              {#if msg.role === 'bot'}
                {@html formatAnswer(msg.text)}
                {#if msg.related && msg.related.length > 0}
                  <div class="related">
                    <div class="related-label">Related topics:</div>
                    {#each msg.related as r}
                      <button class="related-btn" onclick={() => handleRelated(r)}>{r}</button>
                    {/each}
                  </div>
                {/if}
              {:else}
                {msg.text}
              {/if}
            </div>
          </div>
        {/each}
        {#if isTyping}
          <div class="message-row bot">
            <div class="avatar">&#9824;</div>
            <div class="bubble bot typing">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
          </div>
        {/if}
      {/if}
    </div>

    <!-- Input area -->
    <div class="chat-input-area">
      <input
        bind:this={inputEl}
        bind:value={inputText}
        onkeydown={handleKeydown}
        type="text"
        class="chat-input"
        placeholder="Ask about poker strategy..."
        autocomplete="off"
      />
      <button
        class="send-btn"
        onclick={() => submitQuery(inputText)}
        disabled={!inputText.trim()}
        title="Send"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
{/if}

<style>
  /* ── Toggle Tab ── */
  .chat-tab {
    position: fixed;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1000;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 12px;
    background: var(--c-accent);
    color: #fff;
    border: none;
    border-radius: 8px 0 0 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    font-family: inherit;
    writing-mode: horizontal-tb;
    transition: right 0.3s ease, background 0.2s, padding 0.3s;
    box-shadow: -2px 0 12px rgba(0, 0, 0, 0.3);
  }
  .chat-tab:hover {
    background: var(--c-accent-hover);
  }
  .chat-tab.open {
    right: 360px;
    padding: 10px 8px;
  }
  .tab-icon {
    font-size: 18px;
    line-height: 1;
  }
  .tab-text {
    font-size: 13px;
    white-space: nowrap;
  }

  /* ── Panel ── */
  .chat-panel {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 360px;
    z-index: 999;
    background: var(--c-bg-sidebar);
    border-left: 1px solid var(--c-border-nav);
    display: flex;
    flex-direction: column;
    box-shadow: -4px 0 24px rgba(0, 0, 0, 0.3);
    animation: slide-in 0.25s ease;
  }

  @keyframes slide-in {
    from { transform: translateX(100%); }
    to   { transform: translateX(0); }
  }

  /* ── Header ── */
  .chat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 16px 12px;
    border-bottom: 1px solid var(--c-border-nav);
    flex-shrink: 0;
  }
  .header-title {
    font-size: 16px;
    font-weight: 700;
    color: var(--c-text-h);
  }
  .header-subtitle {
    font-size: 11px;
    color: var(--c-text-4);
    margin-top: 2px;
  }
  .header-actions {
    display: flex;
    gap: 4px;
  }
  .header-btn {
    background: transparent;
    border: none;
    color: var(--c-text-4);
    cursor: pointer;
    padding: 6px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s, color 0.15s;
  }
  .header-btn:hover {
    background: var(--c-bg-card);
    color: var(--c-text);
  }

  /* ── Messages Area ── */
  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* ── Empty State ── */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 24px 8px;
    gap: 8px;
  }
  .empty-icon {
    font-size: 36px;
    color: var(--c-accent);
    opacity: 0.7;
  }
  .empty-title {
    font-size: 17px;
    font-weight: 700;
    color: var(--c-text-h);
  }
  .empty-subtitle {
    font-size: 12px;
    color: var(--c-text-4);
    line-height: 1.5;
    max-width: 260px;
  }
  .suggestions {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 12px;
    justify-content: center;
  }
  .suggestion-btn {
    background: var(--c-bg-card);
    border: 1px solid var(--c-border);
    color: var(--c-text-2);
    font-size: 11.5px;
    font-family: inherit;
    padding: 6px 10px;
    border-radius: 14px;
    cursor: pointer;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
    line-height: 1.3;
  }
  .suggestion-btn:hover {
    background: var(--c-bg-hover);
    color: var(--c-text);
    border-color: var(--c-accent);
  }

  /* ── Message Bubbles ── */
  .message-row {
    display: flex;
    gap: 8px;
    align-items: flex-start;
  }
  .message-row.user {
    justify-content: flex-end;
  }
  .avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--c-accent);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .bubble {
    max-width: 85%;
    padding: 10px 14px;
    border-radius: 14px;
    font-size: 13px;
    line-height: 1.55;
    word-wrap: break-word;
  }
  .bubble.user {
    background: var(--c-accent);
    color: #fff;
    border-bottom-right-radius: 4px;
  }
  .bubble.bot {
    background: var(--c-bg-card);
    color: var(--c-text);
    border-bottom-left-radius: 4px;
    border: 1px solid var(--c-border);
  }

  /* Bot bubble content styling */
  .bubble.bot :global(p) {
    margin: 0 0 8px 0;
  }
  .bubble.bot :global(p:last-child) {
    margin-bottom: 0;
  }
  .bubble.bot :global(strong) {
    color: var(--c-text-h);
    font-weight: 600;
  }
  .bubble.bot :global(ul) {
    margin: 6px 0;
    padding-left: 18px;
  }
  .bubble.bot :global(li) {
    margin-bottom: 4px;
  }
  .bubble.bot :global(hr) {
    border: none;
    border-top: 1px solid var(--c-border);
    margin: 10px 0;
  }

  /* ── Related Topics ── */
  .related {
    margin-top: 10px;
    padding-top: 8px;
    border-top: 1px solid var(--c-border);
  }
  .related-label {
    font-size: 11px;
    color: var(--c-text-4);
    margin-bottom: 6px;
    font-weight: 600;
  }
  .related-btn {
    display: block;
    width: 100%;
    text-align: left;
    background: transparent;
    border: none;
    color: var(--c-accent);
    font-size: 12px;
    font-family: inherit;
    padding: 3px 0;
    cursor: pointer;
    transition: color 0.15s;
  }
  .related-btn:hover {
    color: var(--c-accent-hover);
    text-decoration: underline;
  }

  /* ── Typing Indicator ── */
  .bubble.typing {
    display: flex;
    gap: 4px;
    padding: 12px 18px;
  }
  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--c-text-4);
    animation: bounce 1.2s infinite ease-in-out;
  }
  .dot:nth-child(2) { animation-delay: 0.15s; }
  .dot:nth-child(3) { animation-delay: 0.3s; }
  @keyframes bounce {
    0%, 80%, 100% { transform: scale(0.7); opacity: 0.4; }
    40% { transform: scale(1); opacity: 1; }
  }

  /* ── Input Area ── */
  .chat-input-area {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    border-top: 1px solid var(--c-border-nav);
    flex-shrink: 0;
  }
  .chat-input {
    flex: 1;
    background: var(--c-bg-card);
    border: 1px solid var(--c-border);
    border-radius: 20px;
    padding: 10px 16px;
    color: var(--c-text);
    font-size: 13px;
    font-family: inherit;
    outline: none;
    transition: border-color 0.2s;
  }
  .chat-input::placeholder {
    color: var(--c-text-4);
  }
  .chat-input:focus {
    border-color: var(--c-accent);
  }
  .send-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background: var(--c-accent);
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.2s, opacity 0.2s;
  }
  .send-btn:hover:not(:disabled) {
    background: var(--c-accent-hover);
  }
  .send-btn:disabled {
    opacity: 0.4;
    cursor: default;
  }

  /* ── Print: hide everything ── */
  @media print {
    .chat-tab, .chat-panel {
      display: none !important;
    }
  }
</style>
