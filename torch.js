module.exports = {
  run: [
    // nvidia 50-series (Windows, RTX 5080)
    {
      when: "{{platform === 'win32' && gpu === 'nvidia' && kernel.gpu_model && / 50.+/.test(kernel.gpu_model) }}",
      method: "shell.run",
      params: {
        venv: "{{args && args.venv ? args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: [
          "uv pip install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cu129",
          "uv pip install triton-windows",
          "uv pip install https://github.com/woct0rdho/SageAttention/releases/download/v2.1.1-windows/sageattention-2.1.1+cu129torch2.8.0-cp310-cp310-win_amd64.whl"
        ]
      },
      next: null
    },

    // nvidia 50-series (Linux, RTX 5080)
    {
      when: "{{platform === 'linux' && gpu === 'nvidia' && kernel.gpu_model && / 50.+/.test(kernel.gpu_model) }}",
      method: "shell.run",
      params: {
        venv: "{{args && args.venv ? args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: [
          "uv pip install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cu129",
          "uv pip install git+https://github.com/thu-ml/SageAttention.git"
        ]
      },
      next: null
    },

    // generic Windows (nvidia)
    {
      when: "{{platform === 'win32' && gpu === 'nvidia'}}",
      method: "shell.run",
      params: {
        venv: "{{args && args.venv ? args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: [
          "uv pip install --pre torch torchvision torchaudio {{args && args.xformers ? 'xformers' : ''}} --index-url https://download.pytorch.org/whl/nightly/cu129 --force-reinstall",
          "uv pip install https://github.com/woct0rdho/triton-windows/releases/download/v3.2.0-windows.post9/triton-3.2.0-cp310-cp310-win_amd64.whl",
          "uv pip install https://github.com/deepbeepmeep/SageAttention/raw/refs/heads/main/releases/sageattention-2.1.0-cp310-cp310-win_amd64.whl"
        ]
      }
    },

    // Windows AMD (DirectML)
    {
      when: "{{platform === 'win32' && gpu === 'amd'}}",
      method: "shell.run",
      params: {
        venv: "{{args && args.venv ? args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: "uv pip install torch-directml --pre torchaudio torchvision numpy==1.26.4"
      }
    },

    // Windows (CPU)
    {
      when: "{{platform === 'win32' && (gpu !== 'nvidia' && gpu !== 'amd')}}",
      method: "shell.run",
      params: {
        venv: "{{args && args.venv ? args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: "uv pip install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cpu"
      }
    },

    // macOS
    {
      when: "{{platform === 'darwin'}}",
      method: "shell.run",
      params: {
        venv: "{{args && args.venv ? args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: "uv pip install --pre torch torchvision torchaudio"
      }
    },

    // Linux (nvidia general)
    {
      when: "{{platform === 'linux' && gpu === 'nvidia'}}",
      method: "shell.run",
      params: {
        venv: "{{args && args.venv ? args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: [
          "uv pip install --pre torch torchvision torchaudio {{args && args.xformers ? 'xformers' : ''}} --index-url https://download.pytorch.org/whl/nightly/cu129 --force-reinstall",
          "uv pip install sageattention==1.0.6",
          "uv pip install triton"
        ]
      }
    },

    // Linux AMD ROCm
    {
      when: "{{platform === 'linux' && gpu === 'amd'}}",
      method: "shell.run",
      params: {
        venv: "{{args && args.venv ? args.args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: "uv pip install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/rocm6.2"
      }
    },

    // Linux CPU
    {
      when: "{{platform === 'linux' && (gpu !== 'amd' && gpu !== 'nvidia')}}",
      method: "shell.run",
      params: {
        venv: "{{args && args.venv ? args.args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: "uv pip install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cpu"
      }
    }
  ]
};
