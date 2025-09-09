import React, { useEffect, useRef, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Terminal as XTerm } from "xterm";
import { FitAddon } from "xterm-addon-fit";
export interface ExecutionResult {
  success: boolean;
  output: string;
  error?: string | null;
  execution_time: number;
}
import { Play, X, Maximize2, Minimize2 } from "lucide-react";
import "xterm/css/xterm.css";

interface TerminalProps {
  executionResult?: ExecutionResult | null;
  isExecuting?: boolean;
}

const Terminal: React.FC<TerminalProps> = ({
  executionResult,
  isExecuting,
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const [command, setCommand] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    if (terminalRef.current && !xtermRef.current) {
      // Initialize xterm.js
      const terminal = new XTerm({
        theme: {
          background: "#1e1e1e",
          foreground: "#d4d4d4",
          cursor: "#ffffff",
          // @ts-expect-error xterm theme allows selection
          selection: "#264f78",
          black: "#1e1e1e",
          red: "#f44747",
          green: "#6a9955",
          yellow: "#ffcc02",
          blue: "#569cd6",
          magenta: "#c586c0",
          cyan: "#4ec9b0",
          white: "#d4d4d4",
          brightBlack: "#808080",
          brightRed: "#f44747",
          brightGreen: "#6a9955",
          brightYellow: "#ffcc02",
          brightBlue: "#569cd6",
          brightMagenta: "#c586c0",
          brightCyan: "#4ec9b0",
          brightWhite: "#ffffff",
        },
        fontFamily: '"JetBrains Mono", "Fira Code", Monaco, Menlo, monospace',
        fontSize: 13,
        lineHeight: 1.4,
        cursorBlink: true,
        cursorStyle: "block",
        scrollback: 1000,
        tabStopWidth: 4,
      });

      const fitAddon = new FitAddon();
      terminal.loadAddon(fitAddon);

      terminal.open(terminalRef.current);
      fitAddon.fit();

      xtermRef.current = terminal;
      fitAddonRef.current = fitAddon;

      // Welcome message
      terminal.writeln("\x1b[32m● AI IDE Terminal\x1b[0m");
      terminal.writeln("\x1b[90mExecute code and see results here\x1b[0m");
      terminal.writeln("");

      // Handle resize
      const handleResize = () => {
        fitAddon.fit();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        terminal.dispose();
      };
    }
  }, []);

  useEffect(() => {
    if (xtermRef.current && executionResult) {
      const terminal = xtermRef.current;

      if (executionResult.success) {
        terminal.writeln(
          `\x1b[32m✓ Execution completed in ${executionResult.execution_time}ms\x1b[0m`
        );
        if (executionResult.output) {
          terminal.writeln("\x1b[36mOutput:\x1b[0m");
          executionResult.output.split("\n").forEach((line) => {
            terminal.writeln(line);
          });
        }
      } else {
        terminal.writeln(
          `\x1b[31m✗ Execution failed in ${executionResult.execution_time}ms\x1b[0m`
        );
        if (executionResult.error) {
          terminal.writeln("\x1b[31mError:\x1b[0m");
          executionResult.error.split("\n").forEach((line) => {
            terminal.writeln(`\x1b[31m${line}\x1b[0m`);
          });
        }
      }
      terminal.writeln("");
    }
  }, [executionResult]);

  useEffect(() => {
    if (xtermRef.current && isExecuting) {
      const terminal = xtermRef.current;
      terminal.writeln("\x1b[33m⏳ Executing code...\x1b[0m");
    }
  }, [isExecuting]);

  const executeCommand = async () => {
    if (!command.trim() || !xtermRef.current) return;

    const terminal = xtermRef.current;
    terminal.writeln(`\x1b[90m$ ${command}\x1b[0m`);

    try {
      const [cmd, ...args] = command.trim().split(" ");
      const result = await invoke<string>("execute_terminal_command", {
        command: cmd,
        args,
        workingDir: null,
      });

      result.split("\n").forEach((line) => {
        terminal.writeln(line);
      });
    } catch (error) {
      terminal.writeln(`\x1b[31mError: ${error}\x1b[0m`);
    }

    terminal.writeln("");
    setCommand("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand();
    }
  };

  const clearTerminal = () => {
    if (xtermRef.current) {
      xtermRef.current.clear();
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-300 ml-2">Terminal</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={clearTerminal}
            className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
            title="Clear terminal"
          >
            <X className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
            title={isMinimized ? "Maximize" : "Minimize"}
          >
            {isMinimized ? (
              <Maximize2 className="w-4 h-4" />
            ) : (
              <Minimize2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Terminal Output */}
          <div className="flex-1 overflow-hidden">
            <div ref={terminalRef} className="h-full w-full" />
          </div>

          {/* Command Input */}
          <div className="p-3 bg-gray-800 border-t border-gray-700">
            <div className="flex items-center space-x-2">
              <span className="text-green-400 text-sm">$</span>
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter command..."
                className="flex-1 bg-transparent text-gray-200 text-sm outline-none placeholder-gray-500"
              />
              <button
                onClick={executeCommand}
                disabled={!command.trim()}
                className="p-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded transition-colors"
                title="Execute command"
              >
                <Play className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Terminal;
